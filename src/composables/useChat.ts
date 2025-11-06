/**
 * Chat Composable
 * Handles chat widget logic: messages, sending, history, and intersection observer
 */

import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { sendChatMessage } from '../utils/chatbot'

export interface ChatMessage {
  role: 'user' | 'bot'
  text: string
  timestamp: string
}

export function useChat() {
  const isOpen = ref(false)
  const userInput = ref('')
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const messagesContainer = ref<HTMLElement | null>(null)
  const inputField = ref<HTMLInputElement | null>(null)
  const chatContainer = ref<HTMLElement | null>(null)
  const isShifted = ref(false)

  let observer: IntersectionObserver | null = null

  /**
   * Toggle chat window
   */
  const toggleChat = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      nextTick(() => {
        inputField.value?.focus()
      })
    }
  }

  /**
   * Format message text (markdown-like to HTML)
   */
  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
  }

  /**
   * Scroll messages to bottom
   */
  const scrollToBottom = () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }

  /**
   * Get current timestamp
   */
  const getTimestamp = () => {
    const now = new Date()
    return now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  /**
   * Send a message
   */
  const sendMessage = async () => {
    const message = userInput.value.trim()
    if (!message || isLoading.value) return

    // Add user message
    messages.value.push({
      role: 'user',
      text: message,
      timestamp: getTimestamp()
    })

    userInput.value = ''
    isLoading.value = true
    scrollToBottom()

    try {
      const reply = await sendChatMessage(message)
      
      // Add bot response
      messages.value.push({
        role: 'bot',
        text: reply,
        timestamp: getTimestamp()
      })
    } catch (error: any) {
      // Add error message
      messages.value.push({
        role: 'bot',
        text: error.message || 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau. 😔',
        timestamp: getTimestamp()
      })
    } finally {
      isLoading.value = false
      scrollToBottom()
    }
  }

  /**
   * Setup intersection observer to detect overlap with important elements
   */
  const setupIntersectionObserver = () => {
    const importantSelectors = [
      'footer',
      '.footer',
      '[data-important]',
      'button[type="submit"]',
      '.cta-button',
      '.signup-button',
      '.register-button'
    ]

    const importantElements = importantSelectors
      .flatMap(selector => Array.from(document.querySelectorAll(selector)))
      .filter(Boolean)

    if (importantElements.length === 0) return

    observer = new IntersectionObserver(
      (entries) => {
        const chatRect = chatContainer.value?.getBoundingClientRect()
        if (!chatRect) return

        // Check if any important element overlaps with chatbot
        const hasOverlap = entries.some(entry => {
          if (!entry.isIntersecting) return false
          
          const targetRect = entry.target.getBoundingClientRect()
          
          // Check if chatbot overlaps with this element
          return !(
            chatRect.right < targetRect.left ||
            chatRect.left > targetRect.right ||
            chatRect.bottom < targetRect.top ||
            chatRect.top > targetRect.bottom
          )
        })

        isShifted.value = hasOverlap
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px'
      }
    )

    importantElements.forEach(element => {
      observer?.observe(element as Element)
    })
  }

  /**
   * Load chat history from localStorage
   */
  const loadChatHistory = () => {
    const savedMessages = localStorage.getItem('veriastat-chat-history')
    if (savedMessages) {
      try {
        messages.value = JSON.parse(savedMessages)
      } catch (e) {
        console.error('Failed to load chat history:', e)
      }
    }
  }

  /**
   * Save chat history to localStorage
   */
  const saveChatHistory = () => {
    try {
      localStorage.setItem('veriastat-chat-history', JSON.stringify(messages.value))
    } catch (e) {
      console.error('Failed to save chat history:', e)
    }
  }

  onMounted(() => {
    loadChatHistory()
    // Setup intersection observer after a short delay to ensure DOM is ready
    setTimeout(setupIntersectionObserver, 500)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  // Watch messages and save to localStorage
  watch(messages, saveChatHistory, { deep: true })

  return {
    isOpen,
    userInput,
    messages,
    isLoading,
    messagesContainer,
    inputField,
    chatContainer,
    isShifted,
    toggleChat,
    formatMessage,
    sendMessage
  }
}

