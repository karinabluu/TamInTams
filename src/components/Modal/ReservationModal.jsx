import React, { useState, useEffect } from "react";
import "../../styles/css/ReservationModal.css";
import { getToken } from "../../util/token";
import { bookRoom } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { TimeCalc } from "../../util/timeUtil";

const ReservationModal = (props) => {
  const { open, close, roomname, selectedButtons, updateSelectTimes, onReservation } = props;
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const navigate = useNavigate();
  const userToken = getToken();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

    // 예약된 각 시간대의 데이터를 처리하는 함수
    const handleTimeSlot = (start, duration) => {
      const startTime = calculateStartTime(start);
      const endTime = calculateEndTime(start, duration);
    
      // 선택된 시간대의 시작 시간과 종료 시간을 객체로 저장하여 배열에 추가
      const newTimeSlot = { startTime, endTime };
      setSelectedTimeSlots([...selectedTimeSlots, newTimeSlot]);
    };


const calculateStartTime = (start) => {
  const parsedStart = parseInt(start);
  return parsedStart + 9 + ":00";
};

const calculateEndTime = (start, duration) => {
  const hours = parseInt(calculateStartTime(start));
  const endTime = hours + duration;
  return endTime.toString().padStart(2, "0") + ":00";
};



  const handleBookingClick = async () => {
    if (selectedButtons.length === 0) {
      alert("시간을 선택해주세요!");
    } else {
      try {
        const startDate = TimeCalc(new Date());
        const startTime = calculateStartTime(selectedButtons[0]);
        const endTime = calculateEndTime(selectedButtons[0], selectedButtons.length);
        const bookTime = `${startTime} - ${endTime}`;

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const bookDate = `${year}-${month}-${day}`;

        const formData = {
          roomId: roomname,
          userId: userToken,
          bookDate: bookDate,
          bookTime: bookTime,
          durationHours: selectedButtons.length,
        };

        const response = await bookRoom(
          formData.roomId,
          formData.userId,
          formData.bookDate,
          formData.bookTime,
          formData.durationHours
        );

        updateSelectTimes(roomname, selectedButtons, startDate, `예약시간: ${startTime} ~ ${endTime}`);
        console.log("예약완료:", roomname, selectedButtons, startDate, `예약시간: ${startTime} ~ ${endTime}`);
        alert(response.msg);
        alert("예약이 완료되었습니다!");
        onReservation(formData);

        close();
      } catch (error) {
        console.error("Error during booking:", error);
        alert("예약 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {roomname}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="booking" onClick={handleBookingClick}>
              예약
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ReservationModal;
