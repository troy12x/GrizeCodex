// In App.js in a new project

import * as React from 'react';
import { View, Text, SafeAreaView ,TouchableOpacity , StyleSheet , Image ,Platform, StatusBar} from 'react-native';
import { colors, globalStyle } from '../../../theme'

import AppButton from '../../components/AppButton/AppButton';
import AppInput from '../../components/AppInput/AppInput';
const removeUserToken = async () => {
  await removeToken();
  navigation.replace('LoginScreen');
};
function SettingScreen({navigation}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white}}>
    <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
    
   <Text style={{fontSize:25,color:'black'}}>
  Go back
   </Text>
  </TouchableOpacity>
  



    </View>
    <SafeAreaView style={{flex: 1}}>
   
    <View style = {[styles.container]}>
    <View style={{flex: 1}}>

      <Text style={[globalStyle.heading4,{marginVertical:10}]}>Settings</Text>
      <AppInput placeholder={"Change your Name"} />
      <AppInput placeholder={"Change your Email"} />
      <AppInput placeholder={"Change your Password"} />
      <AppInput placeholder={"Confirm your Password"} />
      <View style={{alignSelf: 'center'}}>
        <AppButton title={"Save"} />
      </View>
      <TouchableOpacity
      onPress={removeUserToken}
      style={{width: '40%'}}>
      <Text
        style={[
          globalStyle.heading1,
          {fontSize: 25, textAlign:'left'},
        ]}>
        LogOut
      </Text>
    </TouchableOpacity>
    </View>
    
  </View>
  
    </SafeAreaView>
  </View>

  
  );
}


export default SettingScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerx: {
    height: 50,
    padding: 20,
    ...globalStyle.row
},
  container: {
    flex: 1, 
    backgroundColor: colors.white, 
    zIndex: Platform.OS === "ios"? -1: 0, 
    padding: 15,

    // justifyContent: 'center',

  },
  bg: {
      height: 40, width: 40, backgroundColor: colors.white,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center'
  }
})