import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.camerareproduction.app',
  appName: 'CameraReproduction',
  webDir: '.output/public',
  android: {
    useLegacyBridge: true
  },
  server: {
    androidScheme: 'http'
  },
  loggingBehavior: 'production'
}

export default config
