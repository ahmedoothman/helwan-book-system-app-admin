import axios from 'axios';
import store from '../store';
import Cookies from 'js-cookie';
// form data
let api_url = store.getState().ui.api_url;
/**********************************************/
/* Name: ChangePasswordService */
/* Description: ChangePasswordService */
/**********************************************/
export const changePasswordService = async (data) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.patch(
      `${api_url}/api/v1/admin/updateMyPassword`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
    };
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
/***************************************************************************/
/* Name : updateAccountInfo  */
/* Description : updateAccountInfo  */
/***************************************************************************/
export const updateAccountInfoService = async (data) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.patch(
      `${api_url}/api/v1/admin/updateSuperAdmin`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      data: response.data.user,
    };
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
