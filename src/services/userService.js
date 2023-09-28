import axios from 'axios';
import store from '../store';
import Cookies from 'js-cookie';
// form data
let api_url = store.getState().ui.api_url;
/**********************************************/
/* Name: setCookiesServices */
/* Description: setCookiesServices */
/**********************************************/
export const setCookiesServices = (seatNo, nationalID, id) => {
  const expiresData = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 days
  if (seatNo) {
    Cookies.set('seatNo', seatNo, {
      path: '/',
      expires: expiresData,
    });
  }
  if (nationalID) {
    Cookies.set('nationalID', nationalID, {
      path: '/',
      expires: expiresData,
    });
  }
  if (id) {
    Cookies.set('id', id, {
      path: '/',
      expires: expiresData,
    });
  }
};
/**********************************************/
/* Name: getStudentDataService Request */
/* Description: getStudentDataService Request */
/**********************************************/
export const studentLoginService = async (studentId, nationalID) => {
  const data = {
    studentId,
    nationalID,
  };
  try {
    const response = await axios.post(`${api_url}/api/v1/student/login`, data);
    // set cookies
    setCookiesServices(studentId, nationalID, response.data._id);
    return { status: 'success', user: response.data };
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
/**********************************************/
/* Name: get Role */
/* Description: get Role */
/**********************************************/
export const getRoleService = async () => {
  const token = Cookies.get('token');
  try {
    const response = await axios.get(`${api_url}/api/v1/users/getRole`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status: 'success',
      role: response.data.data.role,
      passwordChanged: response.data.data.passwordChanged,
      privilege: response.data.data.privilege,
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
