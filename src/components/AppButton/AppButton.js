import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {buttonRadious, colors, fonts} from '../../../theme';

const AppButton = ({
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

export default AppButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'rgba(207,37,47,1)',
    borderRadius:20,
    
    paddingHorizontal: 80,
     fontSize:25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize:20,
    fontFamily: fonts.bold,
  },
});
