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
    const response = await axios.post(`${api_url}/api/v1/admin/login`, data);
    // set cookies
    setCookiesServices(response.data.token);
    // return
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
/**********************************************/
/* Name: get Role */
/* Description: get Role */
/**********************************************/
export const getRoleService = async () => {
  const token = Cookies.get('token');
  try {
    const response = await axios.get(`${api_url}/api/v1/auth/getRole`, {
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
/***************************************************************************/
/* Name : get admin  */
/* Description : get admin  */
/***************************************************************************/
export const getMe = async () => {
  const token = Cookies.get('token');
  try {
    const response = await axios.get(`${api_url}/api/v1/auth/getMe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status: 'success',
      data: response.data.data.user,
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

/**********************************************/
/* Name: getAllBooks */
/* Description: getAllBooks */
/**********************************************/
export const getAllBooksService = async (data, page, limit) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.post(
      `${api_url}/api/v1/material/book?page=${page}&limit=${limit}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      books: response.data.data.materials,
      length: response.data.length,
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
/**********************************************/
/* Name: changeBookStatus */
/* Description: changeBookStatus */
/**********************************************/
export const changeBookStatusService = async (bookId, status) => {
  const token = Cookies.get('token');
  const data = {
    id: bookId,
    status,
  };
  try {
    const response = await axios.patch(
      `${api_url}/api/v1/material/status`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      message: response.data.message,
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
/**********************************************/
/* Name: uploadDoctorService */
/* Description: uploadDoctorService */
/**********************************************/
export const uploadDoctorService = async (data) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.post(
      `${api_url}/api/v1/doctor/uploadDoctorsData`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      message: response.data.message,
    };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: 'خطأ في الاتصال بالخادم',
      };
    } else if (error.response.data.message) {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    } else {
      return {
        status: 'error',
        message: 'حدث خطأ ما',
      };
    }
  }
};
/**********************************************/
/* Name: uploadCoursesService */
/* Description: uploadCoursesService */
/**********************************************/
export const uploadCoursesService = async (data) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.post(`${api_url}/api/v1/course/upload`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status: 'success',
      message: response.data.message,
    };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: 'خطأ في الاتصال بالخادم',
      };
    } else if (error.response.data.message) {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    } else {
      return {
        status: 'error',
        message: 'حدث خطأ ما',
      };
    }
  }
};
/**********************************************/
/* Name: resetSystemDoctorsServices */
/* Description: resetSystemDoctorsServices */
/**********************************************/
export const resetSystemDoctorsServices = async (data) => {
  const token = Cookies.get('token');

  try {
    const response = await axios.post(
      `${api_url}/api/v1/admin/resetSystem/doctors`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      message: response.data.message,
    };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        message: 'خطأ في الاتصال بالخادم',
      };
    } else if (error.response.data.message) {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    } else {
      return {
        status: 'error',
        message: 'حدث خطأ ما',
      };
    }
  }
};
/**********************************************/
/* Name: resetSystemCoursesServices */
/* Description: resetSystemCoursesServices */
/**********************************************/
export const resetSystemCoursesServices = async (data) => {
  const token = Cookies.get('token');

  try {
    const response = await axios.post(
      `${api_url}/api/v1/admin/resetSystem/courses`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      message: response.data.message,
    };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        message: 'خطأ في الاتصال بالخادم',
      };
    } else if (error.response.data.message) {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    } else {
      return {
        status: 'error',
        message: 'حدث خطأ ما',
      };
    }
  }
};
/**********************************************/
/* Name: resetSystemMaterialsServices */
/* Description: resetSystemMaterialsServices */
/**********************************************/
export const resetSystemMaterialsServices = async (data) => {
  const token = Cookies.get('token');

  try {
    const response = await axios.post(
      `${api_url}/api/v1/admin/resetSystem/materials`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      message: response.data.message,
    };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        message: 'خطأ في الاتصال بالخادم',
      };
    } else if (error.response.data.message) {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    } else {
      return {
        status: 'error',
        message: 'حدث خطأ ما',
      };
    }
  }
};
/**********************************************/
/* Name: getAllDoctorsServices */
/* Description: getAllDoctorsServices */
/**********************************************/
export const getAllDoctorsServices = async (data, page, limit) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.post(
      `${api_url}/api/v1/doctor/getDoctors?page=${page}&limit=${limit}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      doctors: response.data.data.doctors,
      total: response.data.length,
    };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        message: 'خطأ في الاتصال بالخادم',
      };
    } else if (error.response.data.message) {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    } else {
      return {
        status: 'error',
        message: 'حدث خطأ ما',
      };
    }
  }
};

/**********************************************/
/* Name: getAllCoursesServices */
/* Description: getAllCoursesServices */
/**********************************************/
export const getAllCoursesServices = async (data, page, limit) => {
  const token = Cookies.get('token');
  console.log('-->', page, limit);
  try {
    const response = await axios.post(
      `${api_url}/api/v1/course?page=${page}&limit=${limit}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      courses: response.data.data.courses,
      total: response.data.length,
    };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        message: 'خطأ في الاتصال بالخادم',
      };
    } else if (error.response.data.message) {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    } else {
      return {
        status: 'error',
        message: 'حدث خطأ ما',
      };
    }
  }
};
/**********************************************/
/* Name: deleteDoctorServices */
/* Description: deleteDoctorServices */
/**********************************************/
export const deleteDoctorServices = async (doctorId) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.delete(
      `${api_url}/api/v1/doctor/deleteDoctor/${doctorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      message: response.data.message,
    };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        message: 'خطأ في الاتصال بالخادم',
      };
    } else if (error.response.data.message) {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    } else {
      return {
        status: 'error',
        message: 'حدث خطأ ما',
      };
    }
  }
};
/**********************************************/
/* Name: deleteDoctorServices */
/* Description: deleteDoctorServices */
/**********************************************/
export const deleteCourseServices = async (courseId) => {
  const token = Cookies.get('token');
  try {
    const response = await axios.delete(
      `${api_url}/api/v1/course/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 'success',
      message: response.data.message,
    };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        message: 'خطأ في الاتصال بالخادم',
      };
    } else if (error.response.data.message) {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    } else {
      return {
        status: 'error',
        message: 'حدث خطأ ما',
      };
    }
  }
};
