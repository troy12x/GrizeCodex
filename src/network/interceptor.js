import axios from 'axios';

import {baseUrl} from './api-urls';
import {getUser} from '../services/user';
// import { store } from "../redux/store/store";
// import { setUser } from "../redux/slice/AuthSlice";
// import { displayError } from "../redux/slice/GenericSlice";
// import { VERSION_NO } from "../utils/constant";
// const username = "abc";
// const password = "12345";
// const basicCreds = Base64.btoa(username + ":" + password);

// const currentUser = () => {
//   let users = store.getState().authSlice;
//   return users?.user?.access_token;
// };

const girze = () => {
  const responseHandler = response => {
    // console.log("response axios instance", response);
    // if (response?.data?.status == 500) {
    //   // store.dispatch(removeAuthAction(null));
    // } else {
    return response;
    // }
  };
  const handleError = error => {
    console.log('jjjj', error.response.data);
    // console.log("response error", error.response.data);
    alert(error?.response?.data?.message);
    switch (error) {
      case 400:
        break;
      case 401:
        break;
    }
    throw error;
  };
  const getUserToken = async () => {
    const user = await getUser();
    console.log('user--', user);
    return user?.token;
  };
  const instance = axios.create({
    baseURL: baseUrl,
  });

  instance.interceptors.request.use(async config => {
    let token = await getUserToken();

    config.data = {...config.data};
    switch (config.url) {
      case '/auth/login':
      case '/auth/register':
        config.headers = {
          ...config.headers,
          // 'x-access-token': token,
        };
        break;
      default:
        config.headers = {
          ...config.headers,
          'x-access-token': token,
        };
    }

    console.log('headers', config.headers);

    return config;
  });

  instance.interceptors.response.use(
    response => responseHandler(response),
    error => handleError(error),
  );

  return instance;
};

export {girze};
