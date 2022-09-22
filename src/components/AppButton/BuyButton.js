import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { buttonRadious, colors, fonts } from '../../../theme'
import COLORS from '../../consts/colors';

const BuyButton = ({navigation,title, onPress,textStyle = {},containerStyle={}}) => {
  return (
    <TouchableOpacity style={[styles.buyBtn,containerStyle]  } onPress = {onPress}>
      <Text style={[styles.text,textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default BuyButton


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.buttonColor,
        borderRadius: buttonRadious,
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buyBtn: {
      width: 130,
      height: 50,
      backgroundColor: COLORS.white,
      justifyContent: 'center',
     
      alignItems: 'center',
      borderRadius: 30,
    },
    text: {
        color: colors.black,
        fontSize: 18,
        fontFamily: fonts.bold
        
    }
})