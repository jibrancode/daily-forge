import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dailyforge.app',
  appName: 'Daily Forge',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
