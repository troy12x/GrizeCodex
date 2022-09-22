import { StyleSheet } from "react-native"

export const colors = {
    primary: "#FF0000",
    red: "#F05F57",
    darkRed: "#4B1313",
    purple: "#360940",
    buttonColor: "#FF0000",
    inputBg: "#FFE9E9",
    inputBgSearch:'#EFEFEF',
    inputTextSearch:'#B9B9B9',
    inputText: "#FF1212",
    white: "#ffffff",
    black: "#000",
    gray: "#757575",
    gray1: "#D9D9D9",
    lightGray: "#E0E0E0"
}

export const buttonRadious = 17
export const inputRadious = 30

export const fonts = {
    bold: "Inter-Bold",
    regular: "Inter-Regular"
}

export const globalStyle = StyleSheet.create({
    heading1: {
        fontFamily: fonts.bold,
        fontSize: 20,
        color: colors.black
    },
    description: {
        
        fontSize: 20,
        color: colors.gray
    },
    heading4: {
        fontFamily: fonts.bold,
        fontSize: 35,
        color: colors.black
    },
    text1: {
        fontFamily: fonts.regular,
        fontSize: 20,
        color: colors.black
    },
    p: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: colors.g
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        
        justifyContent: 'space-between'
    },
    rowx: {
        display:'flex',
        flexDirection:'column',
         
    }
})