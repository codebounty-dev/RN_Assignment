import { NativeModules } from 'react-native';
const { RNSegmentIntegration } = NativeModules;

const key = 'Go7KYU9KEmdKU0pYNtnWh6yaLEQbWgbU'

export class SegmentSDK {
    static initialize() {
        RNSegmentIntegration.initialize(key);
    }

    static trackEvent(eventName: string, payload: any) {
        RNSegmentIntegration.trackEvent("eventName", payload);
    }
}