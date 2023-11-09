import React, { useState, useEffect } from 'react';
import './ReservationModal.css';
import { setToken, getToken } from '../../util/token';
import { setUuid, getUuid } from '../../util/token';
import { setBookid, getBookid } from '../../util/token';
import { setUname, getUname } from '../../util/token';
import { bookRoom, fetchBookedTimeslots } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { TimeCalc } from '../../util/modalUtil';

const ReservationModal = (props) => {
  const { open, close, roomname } = props; // open prop 추가
  const [selectedButtons, setSelectedButtons] = useState([]); //선택된 버튼들을 배열로 모아둠
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [bookedTimeslots, setBookedTimeslots] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const id = getUuid();
    console.log('User ID:', getUuid());
    if (!token || !id) {
      navigate('/floor2');
    }
  }, [navigate]);

  //타임슬롯: 모달창 넘버버튼
  const timeSlots = Array.from({ length: 12 }, (_, time) => {
    const hour = time + 9;
    const endHour = hour + 1; // 종료 시간을 시작 시간에 1을 더하여 계산
    return {
      label: `${hour < 10 ? '0' + hour : hour}:00`,
      value: time,
    };
  });

  //버튼을 클릭했을때 동작
  const handleButtonClick = (hour) => {
    const token = getToken();
    const id = getUuid();
    setUname();
    const name = getUname();
    console.log('User ID:', id);
    console.log('User name:', name);

    setSelectedButtons((prevSelectedButtons) => {
      if (prevSelectedButtons.includes(hour)) {
        // 이미 선택된 버튼이면 선택 해제
        return prevSelectedButtons.filter(
          (selectedHour) => selectedHour !== hour
        );
      }
      // 선택된 버튼이 2개 미만이고, 새로운 시간이 이미 예약된 시간대에 포함되지 않는 경우에만 추가
      else if (
        prevSelectedButtons.length < 2 &&
        !bookedTimeslots.some(
          (bookedSlot) => bookedSlot.start <= hour && bookedSlot.end >= hour
        )
      ) {
        // 새로운 시간 추가
        return [...prevSelectedButtons, hour].sort((a, b) => a - b); // 시간 순으로 정렬
      }
      // 그 외의 경우에는 현재 클릭된 시간만 선택
      else {
        return [hour];
      }
    });

    console.log('Selected button value:', hour, roomname);
    console.log('token:', token, 'id:', id);
  };

  useEffect(() => {
    // 예약된 시간대를 가져오는 함수
    const fetchAndSetBookedTimeslots = async () => {
      try {
        // 여기에서 book_id는 예약을 식별하는 ID입니다.
        const _id = getBookid(); // 이 ID를 어떻게 얻을지는 백엔드 API 설계에 따라 달라집니다.
        const bookedSlotsData = await fetchBookedTimeslots(_id);
        setBookedTimeslots(bookedSlotsData);
      } catch (error) {
        console.error('Could not fetch booked timeslots:', error);
      }
    };

    fetchAndSetBookedTimeslots();
  }, [open, roomname]); // 의존성 배열에 필요한 변수를 넣어야 합니다.

  const calculateStartTime = (buttonIndex) => {
    // 오전 9시부터 시작한다고 가정합니다.
    const hour = 9 + buttonIndex; // 예를 들어, buttonIndex가 0이면, 9시를 의미합니다.
    return hour.toString().padStart(2, '0') + ':00';
  };

  const calculateEndTime = (buttonIndex, duration) => {
    // duration은 예약의 길이(시간 단위)를 나타냅니다. 여기서는 항상 1로 가정합니다.
    const hour = 9 + buttonIndex + duration;
    return hour.toString().padStart(2, '0') + ':00';
  };

  const handleTimeSlot = (start, duration) => {
    const startTime = calculateStartTime(start);
    const endTime = calculateEndTime(start, duration);
    console.log('Selected time slot: ', startTime, endTime);

    const newTimeSlot = { startTime, endTime };
    setSelectedTimeSlots((prevTimeSlots) => [...prevTimeSlots, newTimeSlot]);
  };

  //예약버튼
  const handleBookingClick = async () => {
    if (selectedButtons.length === 0) {
      alert('시간을 선택해주세요!');
      return;
    }

    // Convert the first selected button to a starting time string
    const startTime = calculateStartTime(selectedButtons[0]);
    // Calculate end time based on the last selected button
    // If only one button is selected, duration is 1
    // If two buttons are selected, duration is 2, etc.
    const duration = selectedButtons.length;
    const endTime = calculateEndTime(
      selectedButtons[selectedButtons.length - 1],
      duration
    );

    const bookTime = `${startTime} - ${endTime}`;

    try {
      const id = getUuid();
      const bookDate = TimeCalc(new Date());

      const formData = {
        _id: getBookid(),
        roomId: roomname,
        userId: id,
        bookDate: bookDate,
        bookTime: bookTime, // 'HH:mm - HH:mm' formatted string
        durationHours: duration,
        token: getToken(),
      };

      const response = await bookRoom(
        formData._id,
        formData.roomId,
        formData.userId,
        formData.bookDate,
        formData.bookTime,
        formData.durationHours,
        formData.token
      );

      // 예약 성공 메시지
      alert(`예약완료: ${roomname}, ${bookDate}, 예약시간: ${bookTime}`);
      console.log('예약 성공 응답:', response);

      close(); // 모달을 닫습니다.
      setSelectedButtons([]); // 선택된 버튼 상태를 초기화합니다.
    } catch (error) {
      console.error('Error during booking:', error);
      alert('예약 실패: ' + (error.response?.data.message || error.message));
    }
  };

  return (
    <div className={open ? 'openModal modal' : 'modal'} open={open}>
      {open ? (
        <section>
          <header>
            {roomname}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {timeSlots.map((timeSlot) => {
              // 현재 타임슬롯이 예약된 시간대에 포함되는지 확인합니다.
              const isBooked = bookedTimeslots.some(
                (bookedSlot) =>
                  bookedSlot.start <= timeSlot.value &&
                  bookedSlot.end >= timeSlot.value
              );
              // 현재 타임슬롯이 선택된 타임슬롯인지 확인합니다.
              const isSelected = selectedButtons.includes(timeSlot.value);

              return (
                <button
                  key={timeSlot.value}
                  // 'selected' 클래스를 추가하기 위한 로직을 포함합니다.
                  className={`timelinebutton timeslot ${
                    isSelected ? 'selected' : 'notselected'
                  } ${isBooked ? 'booked' : ''}`}
                  onClick={() => handleButtonClick(timeSlot.value)}
                  disabled={isBooked}
                >
                  {timeSlot.label}
                  {isBooked && <span className="booked-label">마감</span>}
                </button>
              );
            })}
          </main>
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
