import React, {useState, useEffect, useCallback} from 'react';
import {orders} from '../network/api-urls';
import {girze} from '../network/interceptor';
import {getUser} from '../services/user';
const CreateOrders = () => {
  const orderCreate = async ({data}) => {
    try {
      let user = await getUser();
      let body = {
        userId: user._id,

        productId: data._id,
        quantity: 1,

        amount: data.amount,
        address: {},
      };
      let response = await girze().post(orders.createorder, body);

      if (response?.data?.data?.message) alert('order added successfully');
      return response;
    } catch (err) {
      console.log('err', err);
    }
  };
  return {orderCreate};
};

export default CreateOrders;
