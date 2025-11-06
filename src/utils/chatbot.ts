// Read-only deployment: no backend chatbot API

export interface ChatResponse {
  reply: string
  timestamp: string
}

export interface ChatError {
  error: string
  details?: string
}

/**
 * Send a message to the AI chatbot
 * @param message User's question
 * @returns Bot's reply
 */
export async function sendChatMessage(_message: string): Promise<string> {
  // Fallback canned response for read-only mode
  return Promise.resolve('Chatbot is disabled in read-only deployment.')
}

/**
 * Clear chat history from localStorage
 */
export function clearChatHistory(): void {
  try {
    localStorage.removeItem('veriastat-chat-history')
  } catch (e) {
    console.error('Failed to clear chat history:', e)
  }
}

/**
 * Get chat history from localStorage
 */
export function getChatHistory(): any[] {
  try {
    const history = localStorage.getItem('veriastat-chat-history')
    return history ? JSON.parse(history) : []
  } catch (e) {
    console.error('Failed to get chat history:', e)
    return []
  }
}
