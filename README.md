# Vue Master Class 24

This project is a part of Vue School's Vue Master Class 2024 course. Modern Vue.js application showcasing advanced features and best practices.

## 🚀 Key Features

- **Authentication System**

  - Secure user authentication with Supabase
  - Protected routes
  - Persistent session management

- **Task Management**

  - Create, read, update, and delete tasks
  - Task status tracking (in_progress, completed)
  - Due date management

- **Project Management**

  - Project creation and organization
  - Task grouping by projects
  - Project status tracking

- **User Management**

  - User profiles with avatars
  - User activity tracking

- **Modern UI/UX**
  - Responsive design
  - Dark mode support
  - Smooth transitions and animations
  - In-place editing capabilities

## 🛠️ Tech Stack

- **Frontend Framework**

  - Vue 3 with Composition API
  - TypeScript for type safety
  - Vite for fast development and building

- **State Management**

  - Pinia for centralized state management
  - Reactive stores with TypeScript support

- **Styling**

  - Tailwind CSS for utility-first styling
  - Utilizing shadcn components
  - Custom theme system with dark mode

- **Backend & Database**

  - Supabase for backend services
  - PostgreSQL database

- **Routing**
  - Vue Router with type-safe routes
  - Dynamic route handling
  - Route guards for authentication

## 🔥 Advanced Vue Approaches

### Async Components & Suspense

The application leverages Vue's advanced features for better performance and user experience:

```vue
<!-- Async Component Loading -->
const AuthLayout = defineAsyncComponent(() => import('@/components/Layout/main/AuthLayout.vue'))

<!-- Suspense for Async Components -->
<Suspense v-if="Component" :timeout="0">
  <Component :is="Component" :key="route.name" />
  <template #fallback>
    <!-- Loading spinner -->
  </template>
</Suspense>
```

### Composition API Patterns

- **Composables**

  - Custom composables for reusable logic
  - Type-safe composables with TypeScript
  - Separation of concerns

- **Reactive State**
  - `ref` for state management
  - Computed properties for derived state
  - Watchers for side effects

### Type Safety

- TypeScript integration throughout the application
- Type definitions for all components and stores
- Type-safe API calls and data handling

### Performance Optimizations

- Lazy loading of components
- Code splitting for better initial load time
- Efficient state management
- Optimized rendering with keyed transitions

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📚 Documentation

- [Vue 3 Documentation](https://v3.vuejs.org/)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
