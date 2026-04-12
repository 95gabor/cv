import type { StorybookConfig } from '@storybook/vue3-vite';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';

const config: StorybookConfig = {
  stories: ['../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async config => {
    const appDir = fileURLToPath(new URL('../app', import.meta.url));

    config.plugins = [...(config.plugins || []), vue()];

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '~': appDir,
      '@': appDir,
    };

    return config;
  },
  staticDirs: ['../public'],
};

export default config;
