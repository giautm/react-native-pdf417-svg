import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import PDF417 from 'react-native-pdf417-svg';

export default function App() {
  return (
    <View style={styles.container}>
      <PDF417 height={60} width={380} text="mailto:hello@giautm.dev" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
