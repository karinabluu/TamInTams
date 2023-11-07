// UserInfo 컴포넌트
import React, { useState, useEffect } from 'react';

const BookingHistory = ({ userData, onReservationDataUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState([]); // 선택된 시간대를 저장할 상태 변수
  const [roomname, setRoomname] = useState(""); //roomname = roomData.name(방이름 초기값)

  //타임슬롯 - 넘버버튼
  const timeSlots = Array.from({ length: 12 }, (_, time) => {
    const hour = time + 9;
  const endHour = hour+ 1; // 종료 시간을 시작 시간에 1을 더하여 계산
    return {
      label: `${hour < 10 ? '0' + hour : hour}:00`,
      value: time,
    };
  });

  useEffect(() => {
    if (userData) {
      setReservationData(userData);
    }
  }, [userData]);

  const [reservationData, setReservationData] = useState({
    예약자: userData ? userData.예약자 : '',
    회의실: userData ?  userData.회의실 : '',
    예약날짜: userData ? userData.예약날짜 : '',
    예약시간: userData ? userData.예약시간 : '',
  });

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
    setShowModal(true);
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    // 예약 데이터 수정
    const updatedData = { ...userData, [key]: value };
    onReservationDataUpdate(updatedData);
  };

  //버튼을 클릭했을때 동작
  const handleButtonClick = (hour) => {
    if (selectedButtons.includes(hour)) {
      setSelectedButtons(
        selectedButtons.filter((selectedHour) => selectedHour !== hour)
      ); // 이미 선택된 버튼이면 선택 해제
    } else if (selectedButtons.length < 2) {
      setSelectedButtons([...selectedButtons, hour]); // 선택된 버튼이 2개 미만이면 새로운 버튼 선택
    } else {
      setSelectedButtons([hour]); //그 외에는 선택된 버튼을 새로운 버튼으로 대체
    }
    console.log("Selected button value:", hour, roomname); // 선택된 방의 이름 로그로 출력
  };

  const handleSave = () => {
    setShowModal(false);
    // Save the updated data here
  };

  return (
    <div>
      <section className="container">
        <div className="userInfo">예약자: {userData && userData['예약자']}</div>
        <div className="userInfo">
          회의실:
          {isEditMode ? (
            <input
              type="text"
              value={userData ? userData['회의실'] : ''}
              onChange={(e) => handleInputChange(e, '회의실')}
            />
          ) : (
            userData ? userData['회의실'] : ''
          )}
        </div>
        <div className="userInfo">
          예약날짜:
           {userData ? userData['예약날짜'] : ''}
        </div>
        <div className="userInfo">
          예약시간:
          {isEditMode ?  ( <div>
          <div className="time-labels">
            {timeSlots.slice(0, 13).map((timeSlot, index) => (
              <div className="time-label" key={index}>
                {timeSlot.label}
              </div>
            ))}
          </div>
          {timeSlots.slice(0, 12).map((timeSlot, index) => (
            <button
              key={index}
              className={`timelinebutton timeslot ${
                selectedButtons && selectedButtons.includes(timeSlot.value)
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleButtonClick(timeSlot.value)}
            ></button>
          ))}
        </div>) : (
            selectedButtons.length > 0
              ? selectedButtons.map((timeSlot, index) => (
                  <span key={index}>{timeSlots[timeSlot].label}, </span>
                ))
              : "선택된 시간 없음"
          )}
        </div>
        </section>
      <footer>
        <button>삭제하기</button>
        <button onClick={handleEdit}>{isEditMode ? '완료' : '수정하기'}</button>
        
      </footer>
      {showModal && (
        <div className="modal">
          <h2>Edit Reservation</h2>
          <div>
            방:
            <input
              type="text"
              value={reservationData['회의실']}
              onChange={(e) => handleInputChange(e, '회의실')}
            />
          </div>
          <div>
            선택 시간:
            <input
              type="text"
              value={reservationData['예약시간']}
              onChange={(e) => handleInputChange(e, '예약시간')}
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
