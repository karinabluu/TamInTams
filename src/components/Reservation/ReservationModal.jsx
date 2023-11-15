import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { getToken, getUuid } from '../../util/token.js';
import { bookRoom, fetchAllReservations } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { TimeCalc } from '../../util/modalUtil.js';
import '../Reservation/ReservationModal.css';
import styled from 'styled-components';

const ReservationModal = (props) => {
  const { open, close, roomname } = props;
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [bookedTimeslots, setBookedTimeslots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const id = getUuid();
    if (!token || !id) {
      navigate('/floor2');
    }
  }, [navigate]);

  const timeSlots = Array.from({ length: 12 }, (_, time) => {
    const hour = time + 9;
    return {
      label: `${hour < 10 ? '0' + hour : hour}:00`,
      value: time,
    };
  });

  useEffect(() => {
    const fetchAndFilterTodayReservations = async () => {
      const token = getToken();
      const today = new Date().toISOString().split('T')[0];

      const allReservations = await fetchAllReservations(token);

      const todayReservations = allReservations
        .filter(
          (reservation) =>
            reservation.bookDate === today && reservation.roomId === roomname
        )
        .map((reservation) => {
          const startTime =
            parseInt(reservation.bookTime.split(':')[0], 10) - 9;
          return startTime;
        });

      setBookedTimeslots(todayReservations);
    };
    fetchAndFilterTodayReservations();
  }, [roomname]);

  const handleButtonClick = (hour) => {
    setSelectedButtons((prevSelectedButtons) => {
      if (prevSelectedButtons.includes(hour)) {
        return prevSelectedButtons.filter(
          (selectedHour) => selectedHour !== hour
        );
      } else if (
        prevSelectedButtons.length < 2 &&
        !bookedTimeslots.includes(hour)
      ) {
        return [...prevSelectedButtons, hour].sort((a, b) => a - b);
      } else {
        return [hour];
      }
    });
  };

  const convertLocalToUTCTime = (localTime) => {
    const localTimeZone = 'Asia/Seoul';
    const momentObj = moment.tz(localTime, 'HH:mm', localTimeZone);
    if (!momentObj.isValid()) {
      console.error('Invalid local time:', localTime);
      return null;
    }
    return momentObj.utc().format('HH:mm');
  };

  const convertUTCtoLocalTime = (utcTime) => {
    const momentObj = moment.utc(utcTime, 'HH:mm');
    if (!momentObj.isValid()) {
      console.error('Invalid UTC time:', utcTime);
      return null;
    }
    return momentObj.add(9, 'hours').format('HH:mm');
  };

  const calculateStartTime = (buttonIndex) => {
    const hour = 9 + buttonIndex;
    return hour.toString().padStart(2, '0') + ':00';
  };

  const calculateEndTime = (buttonIndex) => {
    const hour = 10 + buttonIndex;
    return hour.toString().padStart(2, '0') + ':00';
  };

  const handleBookingClick = async () => {
    if (selectedButtons.length === 0) {
      alert('시간을 선택해주세요!');
      return;
    }

    const bookDate = TimeCalc(new Date());
    const id = getUuid();

    const utcTimeSlots = selectedButtons.map((buttonIndex) => {
      const localStartTime = calculateStartTime(buttonIndex);
      const localEndTime = calculateEndTime(buttonIndex);
      return `${convertLocalToUTCTime(localStartTime)}-${convertLocalToUTCTime(
        localEndTime
      )}`;
    });

    const convertedTimeSlots = utcTimeSlots.map((timeSlot) => {
      const [startTime, endTime] = timeSlot.split('-');
      return {
        startTime: convertUTCtoLocalTime(startTime),
        endTime: convertUTCtoLocalTime(endTime),
      };
    });

    const bookTime = convertedTimeSlots
      .map((slot) => `${slot.startTime} - ${slot.endTime}`)
      .join(', ');
    try {
      const formData = {
        roomId: roomname,
        bookDate: bookDate,
        bookTime: bookTime,
        durationHours: selectedButtons.length,
        userId: id,
      };

      const response = await bookRoom(
        formData.bookDate,
        formData.bookTime,
        formData.durationHours,
        formData.roomId,
        formData.userId
      );
      alert(`예약완료: ${roomname}, ${bookDate}, 예약시간: ${bookTime}`);
      console.log('예약 성공 응답:', response);
      close();
      setSelectedButtons([]);
    } catch (error) {
      console.error('Error during booking:', error);
      alert('예약 실패: ' + (error.response?.data.message || error.message));
      close();
      setSelectedButtons([]);
    }
  };

  return (
    <div className={open ? 'openModal modal' : 'modal'} open={open}>
      {open ? (
        <div className="black-squaree">
          <div className="wrap">
            <span className="notice-title"> {roomname}</span>
            <button onClick={close} className="closebutton">
              &times;
            </button>
          </div>
          <div className="white-squaree">
            <main>
              {timeSlots.map((timeSlot) => {
                const isBooked = bookedTimeslots.includes(timeSlot.value);
                const isSelected = selectedButtons.includes(timeSlot.value);
                return (
                  <button
                    key={timeSlot.value}
                    className={`timelinebutton timeslot ${
                      isSelected ? 'selected' : 'notselected'
                    } ${isBooked ? 'booked' : ''}`}
                    onClick={() => handleButtonClick(timeSlot.value)}
                    disabled={isBooked}
                  >
                    {isBooked ? (
                      <span className="booked-label">마감</span>
                    ) : isSelected ? (
                      '선택'
                    ) : (
                      timeSlot.label
                    )}
                  </button>
                );
              })}
            </main>
            <div>
              <Timeline />
            </div>
            <button className="booking" onClick={handleBookingClick}>
              예약하기
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationModal;

const Timeline = styled.div`
  position: absolute;
  top: 49px;
  left: -30.4%;
  background-image: url('/img/timeline.png');
  background-position: center;
  height: 70px;
  width: 1200px;
  background-repeat: no-repeat;
  z-index: -20;
`;
