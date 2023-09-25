import axios from 'axios';
import store from '../store';
import Cookies from 'js-cookie';
// form data
let api_url = store.getState().ui.api_url;

/**********************************************/
/* Name: setCookiesServices */
/* Description: setCookiesServices */
/**********************************************/
export const setCookiesServices = (token) => {
  const expiresData = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 days
  if (token) {
    Cookies.set('token', token, {
      path: '/',
      expires: expiresData,
    });
  }
};
/**********************************************/
/* Name: login */
/* Description: login */
/**********************************************/
export const loginRequest = async (userName, password) => {
  const data = {
    userName,
    password,
  };
  try {
    const response = await axios.post(`${api_url}/api/v1/users/login`, data);
    // set cookies
    setCookiesServices(response.data.token, response.data.data.user.faculty);
    return { status: 'success', user: response.data.data.user };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: 'خطأ في الاتصال بالخادم',
      };
    } else {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    }
  }
};
