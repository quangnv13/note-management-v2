const showNotify = (state, message, type) => {
  return {
    ...state,
    isShowNotify: true,
    notifyMessage: message,
    notifyType: type,
  };
};

const hideNotify = (state) => {
  return {
    ...state,
    isShowNotify: false,
  };
};

export { showNotify, hideNotify };
