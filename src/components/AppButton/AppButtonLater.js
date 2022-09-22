import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { buttonRadious, colors, fonts } from '../../../theme'

const AppButtonLater = ({title,onPress, textStyle = {},containerStyle={}}) => {
  return (
    <TouchableOpacity style={[styles.container,containerStyle]} onPress = {onPress}>
      <Text style={[styles.text,textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButtonLater


const styles = StyleSheet.create({
    container: {
        
        borderRadius: buttonRadious,
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center',
    },
    text: {
        color: colors.black,
        fontSize: 18,
        fontFamily: fonts.bold
        
    }
})