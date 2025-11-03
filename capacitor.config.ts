import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ac74e794bcd34154a4a7cc89b315f61a',
  appName: 'Auguri Joias',
  webDir: 'dist',
  server: {
    url: 'https://ac74e794-bcd3-4154-a4a7-cc89b315f61a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#8B5CF6',
      showSpinner: false
    }
  }
};

export default config;
