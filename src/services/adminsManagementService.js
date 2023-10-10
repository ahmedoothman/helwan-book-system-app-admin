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
    const response = await axios.get(`${api_url}/api/v1/admin/getAllAdmins`, {
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
      `${api_url}/api/v1/admin/addAdmin`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      data: response.data.data,
      user: response.data.admin,
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
/* Name : delete admin */
/* Description : delete admin */
/***************************************************************************/
export const deleteAdminService = async (id) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.delete(
      `${api_url}/api/v1/admin/deleteAdmin/${id}`,
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
      `${api_url}/api/v1/admin/updateAdmin`,
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
      `${api_url}/api/v1/admin/resetAdminPassword`,
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
      `${api_url}/api/v1/admin/getAdmin`,
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
/***************************************************************************/
/* Name : get faculties service */
/* Description : get faculties service */
/***************************************************************************/
export const getFacultiesService = async () => {
  const token = Cookies.get('token');
  try {
    const response = await axios.get(`${api_url}/api/v1/college`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
