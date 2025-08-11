import React, { useState, useCallback, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  prefixIcon?: React.ReactNode;
  type?: 'text' | 'password';
  secureTextEntry?: boolean;
  errorMessage?: string;
  showError?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  eyeSize?: number;
  eyeColor?: string;
  cursorColor?: string;
  fontSize?: number;
  color?: string;
  placeholderColor?: string;
}

const baseContainerStyle: ViewStyle = {
  paddingHorizontal: 15,
  borderWidth: 1,
  borderRadius: 10,
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
};

const inputTextStyle = (fontSize: number, color: string, marginRight: number) => ({
  flex: 1,
  fontSize,
  color,
  borderWidth: 0,
  borderColor: 'transparent',
  marginRight,
});

const Input: React.FC<InputProps> = React.memo(
  ({
    placeholder = '',
    value,
    onChangeText,
    prefixIcon,
    type = 'text',
    secureTextEntry = false,
    errorMessage = '',
    showError = false,
    containerStyle,
    eyeSize = 20,
    eyeColor = '#000',
    cursorColor = '#000',
    fontSize = 16,
    color = '#000',
    placeholderColor = '#999',
    ...textInputProps
  }) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    const toggleEye = useCallback(() => {
      setIsSecure((prev) => !prev);
    }, []);

    const borderColor = useMemo(
      () => (errorMessage && showError ? 'red' : '#ccc'),
      [errorMessage, showError]
    );

    const combinedContainerStyle = useMemo(
      () =>
        StyleSheet.flatten([
          baseContainerStyle,
          { borderColor },
          containerStyle,
        ]),
      [borderColor, containerStyle]
    );

    const marginRight = type === 'password' && secureTextEntry ? 10 : 0;

    const memoizedInputStyle = useMemo(
      () => inputTextStyle(fontSize, color, marginRight),
      [fontSize, color, marginRight]
    );

    return (
      <View>
        <View style={combinedContainerStyle}>
          {prefixIcon && <View style={{ marginRight: 10 }}>{prefixIcon}</View>}

          <TextInput
            style={memoizedInputStyle}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={type === 'password' ? isSecure : false}
            autoCorrect={false}
            autoCapitalize="none"
            cursorColor={cursorColor}
            {...textInputProps}
          />

          {type === 'password' && secureTextEntry && (
            <TouchableOpacity
              onPress={toggleEye}
              accessibilityRole="button"
              accessibilityLabel={isSecure ? 'Show password' : 'Hide password'}
              style={{ justifyContent: 'center' }}
              activeOpacity={0.7}
            >
              {isSecure ? (
                <EyeOffIcon size={eyeSize} color={eyeColor} />
              ) : (
                <EyeIcon size={eyeSize} color={eyeColor} />
              )}
            </TouchableOpacity>
          )}
        </View>

        {showError && errorMessage ? (
          <Text style={{ marginTop: 5, color: 'red', fontSize: 10 }}>
            {errorMessage}
          </Text>
        ) : null}
      </View>
    );
  }
);

export default Input;
