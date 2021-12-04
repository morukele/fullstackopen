const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.message;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const setNotification = (message) => {
  return {
    type: "SET_NOTIFICATION",
    data: { message },
  };
};

const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export const sendNotification = (message, timer) => {
  return async (dispatch) => {
    await dispatch(setNotification(message));
    setTimeout(async () => await dispatch(removeNotification()), timer * 1000);
  };
};

export default notificationReducer;
