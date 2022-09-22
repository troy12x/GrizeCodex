import { Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, globalStyle } from '../../../theme'
import { useNavigation } from '@react-navigation/native'

const AppHeader = ({hasBg=false}) => {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={hasBg?styles.bg:{}}>
                <Image source={require("../../../assets/images/back.png")} style={{height: 20, width: 20, tintColor: !hasBg?colors.white:colors.black}}/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default AppHeader

const styles = StyleSheet.create({
    container: {
        height: 50,
        padding: 20,
        ...globalStyle.row
    },
    bg: {
        height: 40, width: 40, backgroundColor: colors.white,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
})