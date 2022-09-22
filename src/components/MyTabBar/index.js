import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  StyleSheet,
} from 'react-native';
import AppButton from '../AppButton/AppButton';
import AppInput from '../AppInput/AppInput';
import {colors} from '../../../theme';
import {girze} from '../../network/interceptor';
import {user} from '../../network/api-urls';
function MyTabBar({state, descriptors, navigation}) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textInputSchema, setTextInputSchema] = useState({
    name: '',
  });
  const handleText = (name, value) => {
    setTextInputSchema({...textInputSchema, [name]: value});
  };
  const hide = () => {
    setVisible(false);
  };
  const show = () => {
    setVisible(true);
  };
  const sendProductAddRequest = async () => {
    try {
      let res = await girze().post(user.addProductRequest, {
        productName: textInputSchema.name,
      });
      setVisible(false);
      alert(res.data.data);
    } catch (err) {
      console.log('err', err);
    }
  };
  return (
   <View>
   </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    zIndex: -1,
    // alignItems: "center",

    backgroundColor: ' rgba(0,0,0,0.5)',
  },
  btnContainer: {
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
  modalContainer: {
    height: 200,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
});

export default MyTabBar;
