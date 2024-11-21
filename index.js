/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerRootComponent } from 'expo';
import { Buffer } from 'buffer';

global.Buffer = global.Buffer || require('buffer').Buffer;

registerRootComponent(App);
