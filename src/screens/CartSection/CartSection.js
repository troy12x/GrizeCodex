// In App.js in a new project

import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import GradientView from '../../components/GradientView';
import AppButton from '../../components/AppButton/AppButton';
import AppInput from '../../components/AppInput/AppInput';
import {colors, globalStyle} from '../../../theme';
import AppHeader from '../../components/AppHeader/AppHeader';
import {WebView} from 'react-native-webview';
import {girze} from '../../network/interceptor';
import {payment, orders} from '../../network/api-urls';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
// import {girze} from '../../network/interceptor';
// import {orders} from '../../network/api-urls';
function CartSection({navigation, route}) {
  const {_id, title, price} = route.params.data;
  const isFocused = useIsFocused();
  const [webUrl, setWebUrl] = useState(null);
  const [orderDetail, setOrderDetail] = useState({});
  const [showWebView, setWebView] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textInputSchema, setTextInputSchema] = useState({
    amount: '',
  });
  console.log('textinpput', orderDetail);
  const hide = () => {
    setVisible(false);
  };
  const show = () => {
    setVisible(true);
  };
  console.log('route,', route.params.data);

  const getPayPalLink = async (price, orderId) => {
    try {
      let body = {
        item_list: {
          items: [
            {
              name: title,
              price: price,
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: price,
        },
        description: orderId,
      };

      let res = await girze().post(
        `${payment.getPayPalUrl}/${_id}/${orderId}`,
        body,
      );
      setWebUrl(res?.data?.data?.url);

      console.log('res', res);
    } catch (err) {
      console.log('err', err);
    }
  };

  const getOrderDetail = async () => {
    try {
      setLoading(true);
      let response = await girze().get(`${orders.getOrder}/${_id}`);
      console.log('response', response);
      setOrderDetail(response.data.data[0]);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('err', err);
    }
  };
  const updateOrder = async (price, oldPrice) => {
    let body = {
      amount: parseInt(price),
      productId: title,
    };
    let response = await girze().put(
      `${orders.updateOrders}/${orderDetail?._id}`,
      body,
    );
  };
  useEffect(() => {
    getOrderDetail();
  }, [isFocused]);
  useEffect(() => {
    if (webUrl) {
      setWebView(true);
    }
  }, [webUrl]);
  const handleWebViewNavigationStateChange = newNavState => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }

    if (!newNavState?.nativeEvent?.url) return;
    if (newNavState?.nativeEvent?.url.includes('/success')) {
      updateOrder(textInputSchema.amount, orderDetail.amount);
    }
    console.log('url', newNavState?.nativeEvent?.url);
    // handle certain doctypes
  };
  const handleText = (name, value) => {
    setTextInputSchema({...textInputSchema, [name]: value});
  };

  const requestForRefund = async id => {
    let response = await girze().put(`${payment.refund}/${id}`);
    alert(response?.data?.data);
  };
  const confirmOrder = async id => {
    let response = await girze().put(`${orders.buyOrder}/${id}`);
    alert(response?.data?.data);
  };
  // sb-r5syu20700724@personal.example.com
  // y^+IM8U"
  return (
    <GradientView>
      {showWebView && (
        <WebView
          originWhitelist={['*']}
          incognito={true}
          onLoadEnd={handleWebViewNavigationStateChange}
          // onNavigationStateChange={handleWebViewNavigationStateChange}
          source={{uri: webUrl}}
        />
      )}
      <Modal
        style={{
          flex: 1,
        }}
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={hide}
        onDismiss={hide}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={hide}
          style={styles.main}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              zIndex: 99,

              // flex: 0.5,
            }}>
            <View style={styles.modalContainer}>
              <AppInput
                onChangeText={value => handleText('amount', value)}
                placeholder={'Enter amount'}
                keyboardType="number-pad"
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <AppButton
                  onPress={() => {
                    setVisible(false);
                    getPayPalLink(textInputSchema.amount, orderDetail._id);
                    // setWebView(true);
                  }}
                  containerStyle={styles.btnContainer}
                  title={'Confirm'}
                />
                <AppButton
                  onPress={() => setVisible(false)}
                  containerStyle={styles.btnContainer}
                  title={'Close'}
                />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      {!showWebView && (
        <>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../assets/images/back.png')}
                style={{height: 20, width: 20, tintColor: colors.white}}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, paddingVertical: 10}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              {!loading && (
                <View style={{flex: 1, alignItems: 'center'}}>
                  <AnimatedCircularProgress
                    size={130}
                    width={15}
                    fill={Math.round(
                      (100 * orderDetail?.amount) / orderDetail?.totalAmount,
                    )}
                    tintColor="#00e0ff"
                    onAnimationComplete={() =>
                      console.log('onAnimationComplete')
                    }
                    backgroundColor="#3d5875">
                    {fill => (
                      <Text
                        style={[globalStyle.heading1, {color: colors.white}]}>
                        {orderDetail?.amount}$
                      </Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
              )}
              {loading && (
                <View style={{flex: 1, alignItems: 'center'}}>
                  <AnimatedCircularProgress
                    size={130}
                    width={15}
                    fill={0}
                    tintColor="#00e0ff"
                    onAnimationComplete={() =>
                      console.log('onAnimationComplete')
                    }
                    backgroundColor="#3d5875">
                    {fill => (
                      <Text
                        style={[globalStyle.heading1, {color: colors.white}]}>
                        {orderDetail?.amount}$
                      </Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
              )}
            </View>
            {/* <View style={{flex: 1, backgroundColor: colors.primary}}></View> */}
            {/* <Image
              source={require('../../../assets/images/meter.png')}
              style={{width: null, height: null, flex: 1}}
              resizeMode={'contain'}
            /> */}
            <View style={{alignItems: 'center'}}>
              <Text style={[globalStyle.heading1, {color: colors.white}]}>
                Total
              </Text>
              <Text style={[globalStyle.heading1, {color: colors.white}]}>
                {orderDetail?.totalAmount}$
              </Text>
            </View>
          </View>
          <View style={{flex: 1.5, backgroundColor: colors.white, padding: 20}}>
            <Text style={globalStyle.heading1}>
              {orderDetail?.productDetails?.title}
            </Text>
            <View style={globalStyle.row}>
              <View style={{flex: 1}}>
                <Text style={globalStyle.p}>
                  {orderDetail?.productDetails?.description}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={{uri: orderDetail?.productDetails?.img}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode={'contain'}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              globalStyle.row,
              {backgroundColor: colors.white, padding: 20},
            ]}>
            <AppButton
              onPress={() => setVisible(true)}
              containerStyle={styles.btnContainer}
              title={'Add Money'}
            />
            {orderDetail?.confirmOrder == 'false' &&
              orderDetail?.amount > 0 && (
                <AppButton
                  onPress={() => requestForRefund(orderDetail?._id)}
                  containerStyle={styles.btnContainer}
                  title={'Refund'}
                />
              )}
            <AppButton
              containerStyle={styles.btnContainer}
              onPress={() => {
                if (orderDetail.confirmOrder != 'false') {
                  alert('order already confirmed');
                } else if (orderDetail?.amount == orderDetail?.totalAmount) {
                  confirmOrder(orderDetail?._id);
                } else {
                  alert('please pay the remianing amount');
                }
              }}
              title={'Buy'}
            />
          </View>
        </>
      )}
    </GradientView>
  );
}

export default CartSection;

const styles = StyleSheet.create({
  container: {
    height: 50,
    padding: 20,
    ...globalStyle.row,
  },
  bg: {
    height: 40,
    width: 40,
    backgroundColor: colors.white,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
