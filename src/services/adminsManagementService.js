import axios from 'axios';
import store from '../store';
import Cookies from 'js-cookie';
let api_url = store.getState().ui.api_url;

/***************************************************************************/
/* Name : getAllAdmins */
/* Description : getAllAdmins */
/***************************************************************************/
export const getAllAdminsService = async () => {
  const token = Cookies.get('token');
  try {
    const response = await axios.get(`${api_url}/api/v1/users/getAllAdmins`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', data: response.data.data.users };
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
/* Name : add admin */
/* Description : add admin */
/***************************************************************************/
export const addAdminService = async (data) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.post(
      `${api_url}/api/v1/users/addAdmin`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: 'success', data: response.data };
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
/* Name : delete admin */
/* Description : delete admin */
/***************************************************************************/
export const deleteAdminService = async (id) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.delete(
      `${api_url}/api/v1/users/deleteAdmin/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: 'success' };
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
/* Name : edit admin */
/* Description : edit admin */
/***************************************************************************/
export const editAdminService = async (id, data) => {
  const token = Cookies.get('token');
  const body = {
    id,
    adminInfo: data,
  };
  try {
    const response = await axios.patch(
      `${api_url}/api/v1/users/updateAdmin`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: 'success', data: response.data.user };
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
/* Name : reset password serrvice */
/* Description : reset password serrvice */
/***************************************************************************/
export const resetPasswordService = async (id) => {
  const token = Cookies.get('token');
  const body = {
    id,
  };
  try {
    const response = await axios.patch(
      `${api_url}/api/v1/users/resetAdminPassword`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: 'success', data: response.data.data };
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
/* Name : get admin  */
/* Description : get admin  */
/***************************************************************************/
export const getAdminService = async (userName, phoneNumber) => {
  const token = Cookies.get('token');
  const body = {
    userName: userName ? userName : undefined,
    phoneNumber: phoneNumber ? phoneNumber : undefined,
  };
  try {
    const response = await axios.post(
      `${api_url}/api/v1/users/getAdmin`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: 'success', data: response.data.data.user };
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
