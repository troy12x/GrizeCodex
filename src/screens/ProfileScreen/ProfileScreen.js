// In App.js in a new project

import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, ActivityIndicator,StyleSheet, TouchableOpacity} from 'react-native';
import GradientView from '../../components/GradientView';
import AppButton from '../../components/AppButton/AppButton';
import AppInput from '../../components/AppInput/AppInput';
import {colors, globalStyle} from '../../../theme';
import {orders} from '../../network/api-urls';
import COLORS from '../../consts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import {girze} from '../../network/interceptor';
import {getUser} from '../../services/user';
import CircularProgress from 'react-native-circular-progress-indicator';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useIsFocused} from '@react-navigation/native';
import { Icon } from 'react-native-material-design';
// import ProgressCircle from 'react-native-progress-circle';
function ProfileScreen({navigation,state}) {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [order, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);

  const [user, setUser] = useState({});
  const [fill, setFill] = useState(80);
  const hide = () => {
    setVisible(false);
  };
  const show = () => {
    setVisible(true);
  };
  const fetchOrders = async () => {
    try {
      setLoading(true);
      let user = await getUser();
      setUser(user);
      let response = await girze().get(`${orders.getUserOrders}/${user._id}`);
      if (response.status == 200) setOrders(response.data.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isFocused]);
  console.log('order', order);
  //   [10:41 am, 08/09/2022] Nomi: sb-r5syu20700724@personal.example.com
  // [10:41 am, 08/09/2022] Nomi: y^+IM8U"
  // flex: 1, padding: 25, backgroundColor: colors.white
  return (
    <View style={{}}>
    <View style={style.header}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
    
   <Text style={{fontSize:25,color:'black'}}>
  Go back
   </Text>
  </TouchableOpacity>
  
 <TouchableOpacity       onPress={() => {
  navigation.navigate('SettingScreen',);
}} >

 <Image 
 source={require('../../../assets/images/settings.png')}
 style={{height: 35, width: 35, tintColor: 'rgba(207,37,47,1)'}}

 />
 
 </TouchableOpacity>


    </View>
      <View style={[globalStyle.row,{marginTop:10,padding:20}]}>
 
        <Image
          source={require('../../../assets/images/boy.png')}
          style={{height: 90, width: 90, borderRadius: 20}}
          resizeMode={'contain'}
        />
        
        <View style={{flex: 1}}>
          <Text style={globalStyle.heading1}>{user.username}</Text>
          <Text style={[globalStyle.p, {color: colors.gray}]}>
            {order.length} Items on waitng{' '}
          </Text>
        </View>
     
     
      </View>
      {loading && <ActivityIndicator size="large" color={colors.primary} />}
      {!loading && (
        <View style={{marginTop: 0,padding:30,marginBottom:10}}>
          <Text style={globalStyle.heading1}>Items</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={order}
            keyExtractor={key => key}
            ListFooterComponent={() => <View style={{height: 100}} />}
            renderItem={({item}) => {
              let fill = Math.round((100 * item?.amount) / item?.totalAmount);

              return (
                <View style={[globalStyle.row, {marginBottom: 10}]}>
                  <View style={{flex: 1}}>
                    {/* <CircularProgress
                  value={Math.round((item?.amount / item?.totalAmount) * 100)}
                  inActiveStrokeColor={'#2ecc71'}
                  inActiveStrokeOpacity={0.2}
                  progressValueColor={'#fff'}
                  valueSuffix={'%'}
                /> */}
                    {/* <CircularProgress
                  // size={140}
                  value={500}
                  radius={50}
                  progressValueColor={'#ecf0f1'}
                  activeStrokeColor={'#f39c12'}
                  inActiveStrokeColor={'#9b59b6'}
                  // inActiveStrokeOpacity={0.5}
                  // inActiveStrokeWidth={20}
                  // activeStrokeWidth={40}
                  valuePrefix={'100'}
                /> */}
                    <AnimatedCircularProgress
                      size={100}
                      width={15}
                      fill={fill}
                      // fill={Math.round((item?.amount / item?.totalAmount) * 1000)}
                      tintColor="#00e0ff"
                      onAnimationComplete={() =>
                        console.log('onAnimationComplete')
                      }
                      backgroundColor="#DFE8E0">
                      {fill => <Text>{item?.amount}</Text>}
                    </AnimatedCircularProgress>
                    <Text style={[globalStyle.heading1, {textAlign: 'center'}]}>
                      {item?.productDetails?.price} $
                    </Text>
                  </View>
                  <View style={{flex: 1, marginLeft: 15}}>
                    <Text style={[globalStyle.heading1, {textAlign: 'center'}]}>
                      {item?.productDetails?.title}
                    </Text>
                    <Image
                      source={{uri: item?.productDetails?.img}}
                      style={{
                        width: '100%',
                        height: 130,
                        marginVertical: 10,
                        backgroundColor: colors.lightGray,
                        borderRadius: 10,
                      }}
                      resizeMode={'contain'}
                    />
                    <View style={[globalStyle.row]}>
                      <Text style={globalStyle.heading1}></Text>
                      <AppButton
                        containerStyle={{
                          paddingVertical: 6,
                          paddingHorizontal: 25,
                          borderRadius: 10,
                        }}
                        title={'Reume'}
                        onPress={() => {
                          navigation.navigate('CartScreen', {
                            data: item?.productDetails,
                          });
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

export default ProfileScreen;
const style = StyleSheet.create({

  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    height: 50,
    padding: 20,
 
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    marginHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor:'rgba(207,37,47,1)',
 
    
    borderTopLeftRadius:30,
   borderTopRightRadius:30,
   
   
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
   
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.white,
    width: 50,
    height: 50,
    marginRight:20,
    justifyContent: 'center',
    textAlign:'center',
   borderRadius:50,
  },
});