import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native'
import React from 'react'
import { buttonRadious, colors, fonts } from '../../../theme'

const data = [
    {id: 1, image: require("../../../assets/images/watch.png"), price: "25$", label: "Apple Watch", status: "Buy Later" },
    {id: 2, image: require("../../../assets/images/watch.png"), price: "50$", label: "Apple Mobile", status: "Buy Later" },
    {id: 3, image: require("../../../assets/images/watch.png"), price: "50$", label: "Apple Mobile", status: "Buy Later" },
    {id: 4, image: require("../../../assets/images/watch.png"), price: "50$", label: "Apple Mobile", status: "Buy Later" },
  ]
  
const ImageButton2 = ({title,onPress, textStyle = {},containerStyle={}}) => {
  return (
    <TouchableOpacity style={[styles.container,containerStyle]} onPress = {onPress}>
    <Image source={item.image} style={{marginTop: 20,height: 100, width: "100%", backgroundColor: "rgba(225,225,225,.1)"}} resizeMode={"contain"}/>
    </TouchableOpacity>
  )
}

export default ImageButton2


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.buttonColor,
        borderRadius: buttonRadious,
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        fontSize: 18,
        fontFamily: fonts.bold
        
    }
})