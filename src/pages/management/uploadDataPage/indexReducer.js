export const componentStatesInitialState = {
  success: false,
  error: false,
  errorMessage: '',
  pendingDoctors: false,
  pendingCourses: false,
};
export const componentStatesReducer = (state, action) => {
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      success: true,
      error: false,
      successMessage: action.successMessage,
      pendingDoctors: false,
      pendingCourses: false,
    };
  }
  if (action.type === 'ERROR') {
    return {
      ...state,
      success: false,
      error: true,
      errorMessage: action.errorMessage,
      pendingDoctors: false,
      pendingCourses: false,
    };
  }
  if (action.type === 'PENDING-DOCTORS') {
    return {
      ...state,
      success: false,
      error: false,
      errorMessage: '',
      pendingDoctors: true,
    };
  }
  if (action.type === 'PENDING-COURSES') {
    return {
      ...state,
      success: false,
      error: false,
      errorMessage: '',
      pendingCourses: true,
    };
  }
  if (action.type === 'CLEAR') {
    return {
      ...state,
      pendingDoctors: false,
      pendingCourses: false,
      success: false,
      error: false,
    };
  }
  return componentStatesInitialState;
};
