import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../actions/types";

const initialState = {
  isOpen: true
};

export default function(state = initialState, action) {
  const { type, isOpen } = action;
  switch (type) {
    case SIDEBAR_OPEN:
    case SIDEBAR_CLOSE:
      return {
        ...state,
        isOpen
      };
    default:
      return state;
  }
}
