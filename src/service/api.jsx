import axios from "axios";

const API_URL = "http://3.36.132.186:8000";

// 최종 예약하기
export const bookRoom = async (roomId, userData, bookDate, bookTime, durationHours, userToken) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/books`, 
      {
        roomId,
        userData,
        bookDate,
        bookTime,
        durationHours,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}` // 헤더에 토큰을 포함시킴
        }
      }
    );
    console.log("Booking Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Booking error:", error);
    throw error;
  }
};