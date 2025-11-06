<template>
  <div 
    class="chat-widget-container" 
    :class="{ 'shifted-up': isShifted }"
    ref="chatContainer"
  >
    <!-- Chat Toggle Button (Minimized) -->
    <button 
      v-if="!isOpen" 
      class="chat-toggle-btn glass-button glass-button--primary"
      :class="{ 'minimized': !isOpen }"
      @click="toggleChat"
      aria-label="Open AI Chat"
      title="Mở AI Chat"
    >
      <span class="chat-icon">💬</span>
      <span class="chat-label">AI</span>
    </button>

    <!-- Chat Window -->
    <transition name="chat-slide">
      <div v-if="isOpen" class="chat-window glass-panel">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-title">
            <span class="bot-icon">🤖</span>
            <h3>VeriAsStat AI</h3>
          </div>
          <button 
            class="close-btn"
            @click="toggleChat"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <!-- Messages -->
        <div class="chat-messages" ref="messagesContainer">
          <!-- Welcome message -->
          <div v-if="messages.length === 0" class="message bot welcome">
            <div class="message-content">
              <p>Xin chào! 👋</p>
              <p>Tôi có thể giúp bạn tra cứu thông tin về các phiên bản game:</p>
              <ul>
                <li>🏹 Genshin Impact (GI)</li>
                <li>🚄 Honkai Star Rail (HSR)</li>
                <li>🌀 Zenless Zone Zero (ZZZ)</li>
              </ul>
              <p class="hint">Thử hỏi: "Sắp tới có game nào cập nhật?"</p>
            </div>
          </div>

          <!-- Chat messages -->
          <div 
            v-for="(msg, index) in messages" 
            :key="index" 
            :class="['message', msg.role]"
          >
            <div class="message-avatar">
              {{ msg.role === 'user' ? '👤' : '🤖' }}
            </div>
            <div class="message-content">
              <p v-html="formatMessage(msg.text)"></p>
              <span class="message-time">{{ msg.timestamp }}</span>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="message bot">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <form class="chat-input-form" @submit.prevent="sendMessage">
          <input
            v-model="userInput"
            type="text"
            class="chat-input"
            placeholder="Hỏi về phiên bản game..."
            :disabled="isLoading"
            ref="inputField"
            :maxlength="300"
          />
          <button 
            type="submit" 
            class="send-btn glass-button glass-button--primary"
            :disabled="!userInput.trim() || isLoading"
          >
            {{ isLoading ? '⏳' : '➤' }}
          </button>
        </form>
        <div class="input-hint" v-if="isOpen">
          <small>Độ dài tối đa: 300 ký tự. Còn lại: {{ 300 - userInput.length }}</small>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useChat } from '../../composables/useChat'

const {
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
} = useChat()
</script>

<style scoped src="../../assets/styles/components/ChatWidget.css"></style>


