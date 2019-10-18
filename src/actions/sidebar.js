import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../actions/types";

export const sidebarOpen = () => dispatch => {
  dispatch({
    type: SIDEBAR_OPEN,
    isOpen: true
  });
};

export const sidebarClose = () => dispatch => {
  dispatch({
    type: SIDEBAR_CLOSE,
    isOpen: false
  });
};
