# VeriAsStat Frontend

> Clean architecture Vue 3 + TypeScript application for game character and version management.

## 🎯 Features

- ✅ Character management với graduation stats
- ✅ Multi-game support (Genshin Impact, Honkai: Star Rail, Zenless Zone Zero)
- ✅ Version tracking và timeline
- ✅ Clean architecture với separation of concerns
- ✅ Design system với CSS tokens
- ✅ Fully typed với TypeScript

## 📁 Project Structure

Xem chi tiết trong [ARCHITECTURE.md](./ARCHITECTURE.md)

```
src/
├── components/       # Vue components (UI only)
├── composables/      # Business logic (reusable)
├── constants/        # Constants và enums
├── styles/
│   ├── tokens/      # Design tokens (colors, spacing, etc.)
│   ├── components/  # Component styles
│   └── pages/       # Page styles
├── types/           # TypeScript types
└── utils/           # Helper functions
```

## 🏗️ Architecture Principles

1. **1 Component = 1 Responsibility** - Mỗi component chỉ làm 1 việc
2. **Logic tách khỏi UI** - Business logic trong composables
3. **CSS/Style riêng** - Component CSS trong file riêng
4. **Type Safety** - TypeScript everywhere
5. **Design Tokens** - CSS variables cho theme

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm hoặc yarn

### Installation

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## 📚 Documentation

- [Architecture Guide](./ARCHITECTURE.md) - Cấu trúc và patterns
- [Component Guidelines](./ARCHITECTURE.md#component-design) - Cách viết components
- [Composables Guide](./ARCHITECTURE.md#composables-business-logic) - Business logic patterns

## 🎨 Design System

Project sử dụng design tokens trong `src/styles/tokens/`:

- `colors.css` - Color palette
- `spacing.css` - Spacing scale (8px grid)
- `typography.css` - Font sizes, weights
- `effects.css` - Shadows, transitions, borders

## 🧪 Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## 📝 Contributing

Khi thêm code mới:

1. Đọc [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Follow naming conventions
3. Add JSDoc comments
4. Tách logic vào composables
5. Tách CSS ra file riêng
6. Add proper TypeScript types

## 🔧 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Vuetify 3
- **Router**: Vue Router 4
- **HTTP Client**: Axios
- **State Management**: Composables (no Pinia/Vuex)

---

Made with ❤️ by VeriAsStat Team
