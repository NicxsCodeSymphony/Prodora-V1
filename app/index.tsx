import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SplashScreen } from '~/components/SplashScreen';
import LoginScreen from './(auth)/login';
import '~/global.css';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <>
        <SplashScreen onFinish={() => setShowSplash(false)} />
        <StatusBar style="light" />
      </>
    );
  }

  return (
    <>
        <LoginScreen />
    </>
  );
}
