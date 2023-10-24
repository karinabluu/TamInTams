import { v4 as uuid } from "uuid";

export const initialState = {
  items: [
    {
      id: uuid(),
      name: "비양도",
      boolean: true,
      closedTimes: [],
    },
    {
      id: uuid(),
      name: "표선",
      boolean: true,
      closedTimes: [],
    },
    {
      id: uuid(),
      name: "Nabox",
      boolean: true,
      closedTimes: [],
    },
  ],
  modalOpen: false,
  selectedButtons: [],
};

// Action types
const OPEN_MODAL = "rooms/OPEN_MODAL";
const CLOSE_MODAL = "rooms/CLOSE_MODAL";
const SELECT_BUTTON = "rooms/SELECT_BUTTON";
const UPDATE_CLOSED_TIMES = "rooms/UPDATE_CLOSED_TIMES";

// Action creators for modal

export const openModal = () => {
  return { type: OPEN_MODAL };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

export const selectButton = (button) => ({
  type: SELECT_BUTTON,
  payload: button,
});

export const updateClosedTimes = (roomname, updatedClosedTimes) => ({
  type: UPDATE_CLOSED_TIMES,
  payload: { roomname, updatedClosedTimes },
});

// Reducer
const rooms = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modalOpen: true }; // 모달 열기 처리

    case CLOSE_MODAL:
      return { ...state, modalOpen: false }; // 모달 닫기 처리

    case SELECT_BUTTON:
      const { payload: button } = action;
      return {
        ...state,
        selectedButtons: handleSelectedButtons(state.selectedButtons, button),
      };

    case UPDATE_CLOSED_TIMES:
      const { roomname, updatedClosedTimes } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.name === roomname
            ? { ...item, closedTimes: updatedClosedTimes }
            : item
        ),
      };

    default:
      return state;
  }
};

const handleSelectedButtons = (selectedButtons, button) => {
  if (selectedButtons.includes(button)) {
    return selectedButtons.filter((item) => item !== button);
  } else if (selectedButtons.length < 2) {
    return [...selectedButtons, button];
  }
  return selectedButtons;
};
export default rooms;
