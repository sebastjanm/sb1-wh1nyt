import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';
import { Application } from '@nativescript/core';

// Enable development logging
Object.defineProperty(global, '__DEV__', { value: true });

// Initialize the app
ReactNativeScript.start(React.createElement(MainStack, {}, null));

// Log any errors
Application.on(Application.discardedErrorEvent, ({error}) => {
    console.error('Unhandled error:', error);
});