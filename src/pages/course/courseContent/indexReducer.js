export const courseContentStatesReducer = {
  success: false,
  error: false,
  errorMessage: '',
  pending: false,
};
export const courseContentStatesInitialState = (state, action) => {
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      success: true,
      error: false,
      successMessage: action.successMessage,
      pending: false,
    };
  }
  if (action.type === 'ERROR') {
    return {
      ...state,
      success: false,
      error: true,
      errorMessage: action.errorMessage,
      pending: false,
    };
  }
  if (action.type === 'PENDING') {
    return {
      ...state,
      success: false,
      error: false,
      errorMessage: '',
      pending: true,
    };
  }

  if (action.type === 'CLEAR') {
    return {
      ...state,
      pending: false,
      success: false,
      error: false,
    };
  }
  return courseContentStatesReducer;
};
