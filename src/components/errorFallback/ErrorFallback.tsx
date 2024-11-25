import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {fallbackStyles} from './styles';

const ErrorFallback: React.FC<ErrorFallbackProps> = ({error, resetError}) => {
  const styles = fallbackStyles();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {/* <AlertOctagon color="#FF6B6B" size={width * 0.25} /> */}
      </View>
      <Text style={styles.title}>Oops! Something went wrong.</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Text style={styles.explanation}>
        Don't worry, it's not your fault. We're working on fixing it!
      </Text>
      <TouchableOpacity style={styles.button} onPress={resetError}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
      <View style={styles.backgroundElement1} />
      <View style={styles.backgroundElement2} />
    </View>
  );
};

export default ErrorFallback;
