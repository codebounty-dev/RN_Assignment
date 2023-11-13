import React, { useEffect } from 'react'
import Routes from './src/routes'
import { SegmentSDK } from './src/nativeModule/SegmentSDK'

export default function App() {

  useEffect(() => {
    SegmentSDK.trackEvent("App_Open", null);
  }, [])
  return <Routes />
}