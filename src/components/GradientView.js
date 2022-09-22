import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme';

export default function GradientView({children}) {
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: .1}} colors={[colors.red, colors.darkRed]} style={styles.linearGradient}>
      {/* <SafeAreaView style={{flex: 1}}> */}
        {children}
      {/* </SafeAreaView> */}
    </LinearGradient>
  )
}


// Later on in your styles..
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  }
});