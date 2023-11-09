import axios from "axios";

// const API_URL = "http://54.180.31.53:8080";
const API_URL = "http://3.36.132.186:8000";
// const API_URL = "http://3.37.55.180:8080";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// 최종 예약하기
export const bookRoom = async (
  bookId,
  roomId,
  userId,
  bookDate,
  bookTime,
  durationHours,
  token
) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/room/books`,
      {
        bookId,
        roomId,
        userId,
        bookDate,
        bookTime,
        durationHours,
        token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 토큰을 포함시킴
        },
      }
    );

    if (response.status === 201) {
      console.log("Booking Response:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Booking error:", error);
    throw error;
  }
};

// 이 함수는 방 ID와 특정 시간을 기준으로 예약된 시간대를 가져옵니다.
export const fetchBookedTimeslots = async (_id) => {
  try {
    // API_URL은 당신의 API 기본 URL로 가정합니다.
    const response = await axios.get(`${API_URL}/api/books/${_id}`);
    console.log("Reservation History Response:", response.data);

    return response.data; // 해당 방과 시간에 대한 예약된 시간대를 반환합니다.
  } catch (error) {
    console.error("Error fetching booked timeslots for room:", error);
    throw error; // 함수를 호출하는 곳에서 에러를 처리할 수 있도록 에러를 던집니다.
  }
};

// 예약 내역 조회
export const fetchReservationHistory = async (id) => {
  try {
    // const response = await axios.get(`${API_URL}/api/books/${id}`);
    const response = await axios.get(
      `${API_URL}/api/books/6549f35e5b329007c8363921`
    );
    console.log("Reservation History Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservation history:", error);
    throw error;
  }
};
