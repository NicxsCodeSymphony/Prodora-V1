import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Fingerprint, Delete } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const LoginScreen = () => {
  const [pin, setPin] = useState('');
  const [name] = useState('John');
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      
      setBiometricAvailable(hasHardware && isEnrolled);
    } catch (error) {
      setBiometricAvailable(false);
    }
  };

  const handleNumberPress = (number: string) => {
    if (pin.length < 6) {
      setPin(pin + number);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleBiometric = async () => {
    if (!biometricAvailable) {
      Alert.alert('Biometric Unavailable', 'Biometric authentication is not available on this device.');
      return;
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to login',
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use PIN',
      });

      if (result.success) {
        Alert.alert('Success', 'Biometric authentication successful!');
      } else {
        if (result.error) {
          Alert.alert('Authentication Failed', 'Biometric authentication was not successful.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during biometric authentication.');
    }
  };

  const renderPinDots = () => {
    return (
      <View className="flex-row justify-around px-20 space-x-4 mb-8">
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            className={`w-6 h-6 rounded-full border-2 ${
              index < pin.length 
                ? 'bg-red-500 border-red-500' 
                : 'bg-white border-gray-300'
            }`}
          />
        ))}
      </View>
    );
  };

  const NumberButton = ({ number, onPress }: { number: string; onPress: (number: string) => void }) => (
    <TouchableOpacity
      onPress={() => onPress(number)}
      className="w-16 h-16 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm active:bg-gray-50"
    >
      <Text className="text-xl font-semibold text-gray-800">{number}</Text>
    </TouchableOpacity>
  );

  const ActionButton = ({ children, onPress }: { children: React.ReactNode; onPress: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      className="w-16 h-16 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm active:bg-gray-50"
    >
      {children}
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <View className="flex-row items-center justify-center mt-16 mb-16">
          <View className="w-12 h-12 bg-red-500 rounded-lg items-center justify-center mr-3">
            <Text className="text-white text-xl font-bold">P</Text>
          </View>
          <Text className="text-3xl font-bold text-gray-800">Prodoro</Text>
        </View>

        <View className="items-center mb-12">
          <Text className="text-base font-medium text-gray-800 mb-1">
            Welcome back, {name}
          </Text>
        </View>

        {renderPinDots()}

        <View className="items-center mb-16">
          <Text className="text-gray-600 text-sm font-medium">
            Enter your PIN
          </Text>
        </View>

        <View className="flex-1 items-center justify-center px-8">
          <View className="space-y-6">
            <View className="flex-row justify-between w-72 mb-4">
              <NumberButton number="1" onPress={handleNumberPress} />
              <NumberButton number="2" onPress={handleNumberPress} />
              <NumberButton number="3" onPress={handleNumberPress} />
            </View>

            <View className="flex-row justify-between w-72 mb-4">
              <NumberButton number="4" onPress={handleNumberPress} />
              <NumberButton number="5" onPress={handleNumberPress} />
              <NumberButton number="6" onPress={handleNumberPress} />
            </View>

            <View className="flex-row justify-between w-72 mb-4">
              <NumberButton number="7" onPress={handleNumberPress} />
              <NumberButton number="8" onPress={handleNumberPress} />
              <NumberButton number="9" onPress={handleNumberPress} />
            </View>

            <View className="flex-row justify-between w-72 mb-4">
              <ActionButton onPress={handleBiometric}>
                <Fingerprint size={24} color="#4B5563" />
              </ActionButton>
              <NumberButton number="0" onPress={handleNumberPress} />
              <ActionButton onPress={handleBackspace}>
                <Delete size={24} color="#4B5563" />
              </ActionButton>
            </View>
          </View>
        </View>

        <View className="absolute bottom-8 left-0 right-0 items-center">
          <View className="flex-row items-center justify-around px-18 gap-12">
            <TouchableOpacity>
              <Text className="text-gray-500 text-sm">Switch account</Text>
            </TouchableOpacity>
            <View className="w-px h-4 bg-gray-300" />
            <TouchableOpacity>
              <Text className="text-gray-500 text-sm">Forgot PIN?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;