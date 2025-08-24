import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { Card, CardContent } from '~/components/ui/card';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animationSequence = Animated.sequence([
      // Initial fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Logo scale up with bounce
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      // Text fade in
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(1500),
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start(() => {
      onFinish();
    });
  }, []);

  return (
    <Animated.View 
      style={{
        flex: 1,
        opacity: fadeAnim,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        {/* Main Logo/Icon */}
        <Animated.View
          style={{
            transform: [{ scale: logoScaleAnim }],
            marginBottom: 30,
          }}
        >
          <View className="w-28 h-28 bg-gray-100 rounded-full items-center justify-center shadow-lg">
            <Text className="text-5xl">
              🍅
            </Text>
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.Text
          style={{
            opacity: textFadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="text-4xl font-bold text-gray-800 mb-2 tracking-wider"
        >
          PRODORO
        </Animated.Text>
      </View>
    </Animated.View>
  );
};
