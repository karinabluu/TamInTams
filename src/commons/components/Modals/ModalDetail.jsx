import React, { useState } from "react";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  openModal,
  closeModal,
  selectButton,
  updateClosedTimes,
} from "../../../redux/modules/rooms";

function ModalDetail() {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.rooms.modalOpen);
  const selectedButtons = useSelector((state) => state.rooms.selectedButtons);
  const initialState = useSelector((state) => state.rooms.items);

  const [roomname, roomnameSet] = useState("");

  const handleOpenModal = (item) => {
    dispatch(openModal());
    roomnameSet(item.name);
    console.log("room name:", item.name);
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleButtonClick = (hour) => {
    const selectedItem = initialState.find((item) => item.name === roomname);
    if (selectedItem) {
      const isButtonClosed = selectedItem.closedTimes.includes(hour);
      if (!isButtonClosed) {
        const updatedClosedTimes = [
          ...selectedItem.closedTimes,
          isButtonClosed,
          hour,
        ];
        console.log("Updated closed times:", updatedClosedTimes); // 콘솔에 출력
        dispatch(updateClosedTimes(roomname, updatedClosedTimes));
        dispatch(selectButton(hour)); // selectButton dispatch 호출 이동
        console.log("Selected button value:", hour);
      }
    }
  };
  const timeSlots = Array.from({ length: 12 }, (_, index) => {
    const hour = index + 9;
    return {
      label: `${hour < 10 ? "0" + hour : hour}:00`,
      value: index,
    };
  });

  return (
    <>
      {initialState.map((item) => (
        <button key={item.id} onClick={() => handleOpenModal(item)}>
          {item.name}
        </button>
      ))}

      <Modal
        open={modalOpen}
        close={handleCloseModal}
        roomname={roomname}
        selectedButtons={selectedButtons}
      >
        {timeSlots.map((timeSlot) => {
          const selectedItem = initialState.find(
            (item) => item.name === roomname
          );
          const isButtonSelected =
            selectedItem && selectedItem.selectedTimes.includes(timeSlot.value);
          const isButtonClosed = selectedItem.closedTimes.includes(
            timeSlot.value
          );

          return (
            <button
              key={timeSlot.value}
              style={{
                backgroundColor: isButtonSelected
                  ? "red"
                  : isButtonClosed
                  ? "gray"
                  : "rgba(128, 128, 128, 0.3)",
                color: isButtonSelected ? "white" : "black",
                cursor: isButtonClosed ? "not-allowed" : "pointer",
              }}
              onClick={() =>
                !isButtonSelected && handleButtonClick(timeSlot.value)
              }
            >
              {isButtonSelected ? timeSlot.value : timeSlot.label}
              {isButtonClosed ? "마감" : timeSlot.label}
            </button>
          );
        })}
      </Modal>
    </>
  );
}

export default ModalDetail;
