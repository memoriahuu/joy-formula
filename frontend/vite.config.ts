
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        }
      }
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/f232edc536b9310bdca4bcd53c1aee8a1be5c1d1.png': path.resolve(__dirname, './src/assets/f232edc536b9310bdca4bcd53c1aee8a1be5c1d1.png'),
        'figma:asset/dcf8b305885a632a490f729fe314980e8742e12a.png': path.resolve(__dirname, './src/assets/dcf8b305885a632a490f729fe314980e8742e12a.png'),
        'figma:asset/d55f0c6f64187b2aff71cc2cc23da08b81665f02.png': path.resolve(__dirname, './src/assets/d55f0c6f64187b2aff71cc2cc23da08b81665f02.png'),
        'figma:asset/a442465baf4be4743588f4589afd2d541ab38494.png': path.resolve(__dirname, './src/assets/a442465baf4be4743588f4589afd2d541ab38494.png'),
        'figma:asset/5e23b583e6ceb3250bf5714b464a5fc90e5eba62.png': path.resolve(__dirname, './src/assets/5e23b583e6ceb3250bf5714b464a5fc90e5eba62.png'),
        'figma:asset/4d63ccd21549b22cd5515f8a273e040386394a5f.png': path.resolve(__dirname, './src/assets/4d63ccd21549b22cd5515f8a273e040386394a5f.png'),
        'figma:asset/481ec9271992b35c78654813354c17a1bbe7b8b3.png': path.resolve(__dirname, './src/assets/481ec9271992b35c78654813354c17a1bbe7b8b3.png'),
        'figma:asset/475038219007e11e89f14c38502ca66e5fbc297e.png': path.resolve(__dirname, './src/assets/475038219007e11e89f14c38502ca66e5fbc297e.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });