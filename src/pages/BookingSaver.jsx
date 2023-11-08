import React, { useState, useEffect } from 'react';
import { getToken } from "../../util/token";
import { useNavigate } from "react-router-dom";
import Modal from './Modal';
import BookingHistory from './BookingHistory';

const BookingSaver = (props) => {
  const { roomname, selectedButtons, updateSelectTimes, onReservation } = props;
  const navigate = useNavigate();
  const userToken = getToken();
  const [bookDate, setBookDate] = useState(""); // bookDate 상태 추가
  const [startTime, setStartTime] = useState(""); // startTime 상태 추가
  const [endTime, setEndTime] = useState(""); // endTime 상태 추가
  const [reservationData, setReservationData] = useState({
    roomId: roomname,
    userId: userToken,
    bookDateTime: bookDate, // 수정필요!!!!!!!!!!!!!
    bookTime: `${startTime} - ${endTime}`, // bookTime 설정
    durationHours: selectedButtons.length,
    userToken,
  });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleReservationData = (newData) => {
    // bookDate, startTime, endTime을 설정
    setBookDate(newData.bookDate);
    setStartTime(newData.startTime);
    setEndTime(newData.endTime);
    // reservationData를 업데이트하여 bookTime을 새로 설정
    setReservationData({
      ...reservationData,
      bookDateTime: newData.bookDate,
      bookTime: `${newData.startTime} - ${newData.endTime}`,
    });
  };

  return (
    <div>
      <BookingHistory userData={reservationData} setReservationData={setReservationData} />
      <Modal roomname={roomname} onReservation={handleReservationData} />
    </div>
  );
};

export default BookingSaver;
