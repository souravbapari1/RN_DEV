// ErrorBoundary.tsx

import React, {Component, ErrorInfo, ReactNode} from 'react';
import {
  DevSettings,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {explainAICodeError} from '../shared/lib/ai';

const ErrorReporting = {
  logErrorToMyService: (error: Error, errorInfo: ErrorInfo) => {
    console.warn('🚨 Logged Error:', error);
    explainAICodeError(error.message + errorInfo.componentStack);
  },
};

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false, error: null, errorInfo: null};
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({errorInfo});
    ErrorReporting.logErrorToMyService(error, errorInfo);
  }

  handleReload = () => {
    if (__DEV__) {
      DevSettings.reload(); // Dev only
    }
    // In production, navigate to safe screen or show retry option
  };

  render() {
    const {hasError, error, errorInfo} = this.state;

    if (!hasError) return this.props.children;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.emoji}>⚠️</Text>
        <Text style={styles.title}>React Native Error Boundary</Text>

        <View style={styles.block}>
          <Text style={styles.label}>What Happened?</Text>
          <Text style={styles.value}>
            {error?.message ?? 'Unknown error occurred.'}
          </Text>
        </View>

        {errorInfo?.componentStack && (
          <View style={styles.block}>
            <Text style={styles.label}>Where It Happened:</Text>
            <Text style={styles.stack}>{errorInfo.componentStack.trim()}</Text>
          </View>
        )}

        <View style={styles.block}>
          <Text style={styles.label}>What Can You Do?</Text>
          <Text style={styles.value}>
            Check the stack trace and verify props, refs, and states passed to
            components.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleReload}>
          <Text style={styles.buttonText}>🔁 Reload App</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.devNote}>
            This screen is visible only because the app is in development mode.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#c62828',
    marginBottom: 20,
  },
  block: {
    marginBottom: 20,
    maxHeight: 180,
    overflow: 'scroll',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  value: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  stack: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    overflow: 'scroll',
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    marginTop: 30,
  },
  devNote: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
});

export default ErrorBoundary;
