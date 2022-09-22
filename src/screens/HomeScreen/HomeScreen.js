// In App.js in a new project
// In App.js in a new project

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import GradientView from '../../components/GradientView';
import AppButton from '../../components/AppButton/AppButton';
import AppButtonLater from '../../components/AppButton/AppButtonLater';
import ImageButton from '../../components/AppButton/ImageButton';
import AppInput from '../../components/AppInput/AppInput';
import image from '../../../assets/plant1.png';

import {colors, globalStyle} from '../../../theme';
import {girze} from '../../network/interceptor';
import {product} from '../../network/api-urls';
import CreateOrders from '../../hooks/createOrderHook';
import {removeToken} from '../../services/user';
import Appb from '../../components/AppButton/Appb';
const HomeScreen = ({navigation, route}) => {
  const {orderCreate} = CreateOrders();
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [renderItems, setRenderItems] = useState([]);
  const [searchBar, setSearchBarText] = useState('');
  const fetchProducts = async () => {
    try {
      // console.log('response', body);
      setLoading(true);

      let response = await girze().get(product.allProducts);
      if (response.status == 200) {
        setLoading(false);
        setProducts(response.data.data);
        setRenderItems(response.data.data);
      }
    } catch (err) {
      setLoading(false);
      console.log('err', err);
    }
  };
  const createOrder = async item => {
    let data = {...item, amount: 0};
    let res = await orderCreate({data});
    if (res.status == 200) navigation.navigate('ProfileScreen');
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const search = text => {
    setSearchBarText(text);
    let filterProducts = products.filter(item =>
      item?.title?.toLowerCase().startsWith(text.toLowerCase()),
    );
    setRenderItems(filterProducts);
  };
  console.log('products', products);
  const removeUserToken = async () => {
    await removeToken();
    navigation.replace('LoginScreen');
  };
  //   [10:41 am, 08/09/2022] Nomi: sb-r5syu20700724@personal.example.com
  // [10:41 am, 08/09/2022] Nomi: y^+IM8U"
  return (
    <View style={{flex: 1, padding: 20, backgroundColor: colors.white}}>
   <SafeAreaView style={{flex: 1}}>
     <>
       <View style={globalStyle.row}>
         <Text style={globalStyle.heading4}>Grize</Text>
         <>
           
           <View style={globalStyle.row}>
         
           <ImageButton
           containerStyle={{
             // paddingHorizontal: 10,
             paddingVertical: 5,
            
             backgroundColor: colors.white,
             borderRadius: 8,
           }}
           textStyle={{fontSize: 12, color: colors.black}}
           onPress={() => {
             navigation.navigate('ProfileScreen');
           }}
         />
           </View>
          
         </>
       </View>
    
     </>
   <ScrollView scrollEventThrottle={16}>
   <View style={{width: '60%', marginVertical: 20,lineHeight:'2rem'}}>
   <Text style={[globalStyle.heading1, {fontSize: 30}]}>
     What do you
   
   </Text>
   <Text style={[globalStyle.heading1, {fontSize: 30}]}>
   Want to buy ?
 
 </Text>
 </View>
 
 <AppInput
   placeholder={'Search'}
   value={searchBar}
   onChangeText={text => search(text)}
 />
 {loading && <ActivityIndicator size="large" color={colors.primary} />}
   <FlatList
   showsVerticalScrollIndicator={true}
   data={renderItems}
   containerStyle={{ borderBottomWidth: 0 }}

   keyExtractor={item => item._id}
   ItemSeparatorComponent={() => <View style={{height: 20}} />}

   renderItem={({item}) => (
      
    <View
    style={{
      
     position:'relative',
     flex:1,
      backgroundColor: 'rgba(247,247,247,2)',
  
    }}>

    <TouchableOpacity       onPress={() => {
      navigation.navigate('Preview', {data: item});
    }}>
    <View style={[{height:220,width:'100%',backgroundColor:'rgba(207,37,47,1)',borderRadius:40,elevation:10, padding:30,gap:5, paddingVertical: 10, marginTop:10   }]}>

    <View style={[globalStyle.row,{height:"100%",width:'100%',textAlign:'left'}]}>
    <View style={{paddingTop:20,width:'40%'}}>
    <Text
    style={{
     
      color: colors.white,
      fontWeight: 'bold',
     textAlign:'left',
     marginBottom:20,
      fontSize: 25,
    }}>
    {item.price} $
    </Text>
    <Text style={{fontSize:30,color:colors.white,fontWeight:'bold',textAlign:'left'}} >{item.title}</Text>
    <Text numberOfLines={2} style={{fontSize:20,color:colors.white,}}>{item.description}</Text>
    </View>
     
    <Image
    style={{
     height:330,
     position:'relative',
     width:'100%'
    }}
    source={{uri: item.img}}
    
    />
    </View>
    
    </View>
    </TouchableOpacity>
  
  </View>
   )}
 />
   </ScrollView>
   </SafeAreaView>
 </View>
  );
}

export default HomeScreen;
