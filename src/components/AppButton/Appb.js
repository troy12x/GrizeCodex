import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react';
  import {buttonRadious, colors, fonts} from '../../../theme';
  
  const Appb = ({
    title,
    onPress,
    loading,
    textStyle = {},
    containerStyle = {},
    disabled,
  }) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.container, containerStyle]}
        onPress={onPress}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  };
  
  export default Appb;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.black,
      borderTopLeftRadius:20,

      paddingHorizontal: 30,
      paddingVertical: 10,
      alignItems: 'center',
    },
    text: {
      color: colors.white,
      fontSize: 18,
      fontFamily: fonts.bold,
    },
  });
  