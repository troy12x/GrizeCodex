import React from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet ,  Touchable,
  TouchableOpacity,} from 'react-native';

import COLORS from '../../consts/colors';
import image from '../../../assets/plant1.png'
import { colors } from '../../../theme';
import BuyButton from '../../components/AppButton/BuyButton';
import CreateOrders from '../../hooks/createOrderHook';
import AppButtonLater from '../../components/AppButton/AppButtonLater';
import ImageButton from '../../components/AppButton/ImageButton';

const Preview = ({navigation, route}) => {
  console.log('route.params', route.params.data);
  const {title, img, description ,price} = route.params.data;
  const {orderCreate} = CreateOrders();

  const createOrder = async item => {
    let data = {...item, amount: 0};
    let res = await orderCreate({data});
    if (res.status == 200)
      navigation.navigate('CartSection', {data: route.params.data});
  };
 
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={style.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      
     <Text style={{fontSize:25,color:'black'}}>
    Go back
     </Text>
    </TouchableOpacity>
    
  <Image 
  source={require('../../../assets/images/cart.png')}
  style={{height: 40, width: 40, tintColor: colors.black}}
     onPress={() => {
    createOrder(item);
  }}
  />
 
 
      </View>
      <View style={style.imageContainer}>
      <Image
      source={{uri: img}}
      style={{width: '100%', height: 300}}

      resizeMode={'cover'}
    /> 
      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold',color:'white'}}>{title}</Text>
          <View style={style.priceTag}>
          <Text
            style={{
             
              color: colors.black,
              fontWeight: 'bold',
             textAlign:'center',
              fontSize: 16,
            }}>
         {price} $
          </Text>
        </View>
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold',color:'white'}}>About</Text>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}>
            {description}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
             
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
             
              </Text>
            
            </View>
        
  
          <BuyButton
            containerStyle={{
              paddingVertical: 2,
              paddingHorizontal: 15,
              borderRadius: 100,
            }}

            title={'Start'}
            onPress={() => {
              createOrder(route.params.data);
            }}
          />
          
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export default Preview;