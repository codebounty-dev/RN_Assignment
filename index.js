/**
 * @format
 */

import {AppRegistry, InteractionManager } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { SegmentSDK } from './src/nativeModule/SegmentSDK';


SegmentSDK.initialize();
AppRegistry.registerComponent(appName, () => App);
