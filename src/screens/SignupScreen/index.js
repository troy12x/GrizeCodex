import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {colors, globalStyle} from '../../../theme';
import AppButton from '../../components/AppButton/AppButton';
import AppInput from '../../components/AppInput/AppInput';
import AppHeader from '../../components/AppHeader/AppHeader';
import GradientView from '../../components/GradientView';
import {auth} from '../../network/api-urls';
import {girze} from '../../network/interceptor';

function Index({navigation}) {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [signupSchema, setSignupSchema] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const signup = async body => {
    try {
      console.log('response', body);
      setLoading(true);

      let response = await girze().post(auth.signup, body);
      if (response.status == 200) {
        setLoading(false);
        setSignupSchema(initialValues);
        alert('Signup Successfully');
        navigation.goBack();
      }
      console.log('response', response);
    } catch (err) {
      setLoading(false);
      console.log('err', err);
    }
  };
  const handleText = (name, value) => {
    setSignupSchema({...signupSchema, [name]: value});
  };
  return (
    <GradientView>
      <View style={{marginTop: StatusBar.currentHeight}}>
        <AppHeader hasBg />
      </View>
      <View style={[styles.container]}>
        <View style={{flex: 1}}>
          <Text style={[globalStyle.heading1, {marginVertical: 30,fontSize:40}]}>
            Register
          </Text>
          <AppInput
            onChangeText={value => handleText('username', value)}
            placeholder={'Type your Name'}
          />
          <AppInput
            onChangeText={value => handleText('email', value)}
            placeholder={'Type your Email'}
          />
          <AppInput
            onChangeText={value => handleText('password', value)}
            placeholder={'Type your Password'}
          />
          <AppInput
            onChangeText={value => handleText('confirmPassword', value)}
            placeholder={'Type your Password'}
          />
          <View style={{alignSelf: 'center'}}>
            <AppButton
              disabled={loading}
              loading={loading}
              onPress={() => {
                signup(signupSchema);
              }}
              title={'Register'}
            />
          </View>
        </View>
      </View>
    </GradientView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: Platform.OS === 'ios' ? -1 : 0,
    borderTopRightRadius: 60,
    padding: 25,
    // justifyContent: 'center',
    marginTop: 20,
  },
});
