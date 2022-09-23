import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import {colors, globalStyle} from '../../../theme';
import AppButton from '../../components/AppButton/AppButton';
import AppInput from '../../components/AppInput/AppInput';
import GradientView from '../../components/GradientView';
import {setUser} from '../../services/user';
import {girze} from '../../network/interceptor';
import {auth} from '../../network/api-urls';
const ForgetPassword = ({navigation}) => {
  const [loginSchema, setLoginSchema] = useState({
    email: 'eyad93@gmail.com',
    password: '12Hamaz',
  });
  const [loading, setLoading] = useState(false);
  const login = async body => {
    try {
      console.log('response', body);
      setLoading(true);

      let response = await girze().post(auth.login, body);
      if (response.status == 200) {
        setLoading(false);
        await setUser(response.data.data);
        navigation.replace('HomeStack');
      }
      console.log('response', response);
    } catch (err) {
      setLoading(false);
      console.log('err', err);
    }
  };
  const handleText = (name, value) => {
    setLoginSchema({...loginSchema, [name]: value});
  };
  return (
    <GradientView >
    <StatusBar translucent backgroundColor={'transparent'} />
    <View style={{flex: 1}}>
      <Image
        source={require('../../../assets/images/boy.png')}
        style={{height: '100%', width: '100%', zIndex: 10}}
        resizeMode={'contain'}
      />
    </View>
    <View
      style={{
        flex: 2,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}>
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={[globalStyle.heading1, {marginBottom: 20,fontSize:40}]}>
            Send Email
          </Text>
       
          <AppInput
            onChangeText={value => handleText('password', value)}
            placeholder={'Type your Password'}
          />
          <View style={{alignSelf: 'center',marginTop:5}}>
            <AppButton
              disabled={loading}
              loading={loading}
              title={'Forget'}
              onPress={() => {
                login(loginSchema);
                // navigation.replace("HomeStack")
              }}
            />
          </View>
        </View>
      </View>
      <View style={[globalStyle.row, {margin: 30}]}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={globalStyle.heading1}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  </GradientView>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: Platform.OS === 'ios' ? -1 : 0,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    padding: 25,
    justifyContent: 'center',
    bottom: 25,
  },
});
