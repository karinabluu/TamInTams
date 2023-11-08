import React from 'react';
import '../../styles/css/ReservationModal.css';
import { bookRoom } from '../../service/api'; //fetchReservationHistory 나중에 추가될것

const ReservationModal = (props) => {
  const { open, close, roomname, selectedButtons, updateSelectTimes } = props;

  const handleBookingClick = async () => {
    if (selectedButtons.length === 0) {
      alert('시간을 선택해주세요!');
    } else {
      try {
        updateSelectTimes(roomname, selectedButtons);
        console.log('예약완료:', roomname, selectedButtons);
        const response = await bookRoom(roomname, true);
        alert(response.msg);
        alert('예약이 완료되었습니다!');
        close();
      } catch (error) {
        console.error('Error during booking:', error);
        alert('예약 중 오류가 발생했습니다.');
      }
    }
  };

  // // 예약 내역 조회 버튼 클릭 핸들러
  // const handleReservationHistoryClick = async (roomId) => {
  //   try {
  //     const history = await fetchReservationHistory(roomId);
  //     // 예약 내역 조회 로직
  //     console.log("Reservation History:", history);
  //   } catch (error) {
  //     console.error("Error fetching reservation history:", error);
  //     alert("예약 내역 조회 중 오류가 발생했습니다.");
  //   }
  // };

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
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
            <button
              className="booking"
              onClick={() => handleBookingClick(roomname)}
            >
              예약
            </button>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ReservationModal;