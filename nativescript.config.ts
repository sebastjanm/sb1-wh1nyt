import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.carsubscription',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  cssParser: 'postcss'
} as NativeScriptConfig;