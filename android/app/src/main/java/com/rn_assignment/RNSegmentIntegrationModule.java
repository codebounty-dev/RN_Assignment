package com.rn_assignment;

import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.segment.analytics.Analytics;
import com.segment.analytics.Properties;

public class RNSegmentIntegrationModule extends ReactContextBaseJavaModule {

    public RNSegmentIntegrationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNSegmentIntegration";
    }

    @ReactMethod
    public void initialize(String writeKey) {
        runOnMainThread(() -> {
            // Create an analytics client with the given context and Segment write key.
            Analytics analytics = new Analytics.Builder(getReactApplicationContext(), writeKey)
                    .trackApplicationLifecycleEvents() // Enable this to record certain application events automatically!
                    .recordScreenViews() // Enable this to record screen views automatically!
                    .build();

// Set the initialized instance as a globally accessible instance.
            Analytics.setSingletonInstance(analytics);
        });
    }

    @ReactMethod
    public void trackEvent(String event, ReadableMap properties) {
        runOnMainThread(() -> {
            Properties segmentProperties = new Properties();
            if (properties != null) {
                segmentProperties.putAll(properties.toHashMap());
            }
            Analytics.with(getReactApplicationContext()).track(event, segmentProperties);
        });
    }

    private void runOnMainThread(Runnable runnable) {
        new Handler(Looper.getMainLooper()).post(runnable);
    }
}