import axios from "axios";

const API_URL = "http://54.180.31.53:8080";
// const API_URL = "http://3.36.132.186:8000";
// const API_URL = "http://3.37.55.180:8080";

const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// 최종 예약하기
export const bookRoom = async (bookDate, bookTime, durationHours, roomId, userId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/books`,{
        bookDate,
        bookTime,
        durationHours,     
        roomId,
        userId,
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


//예약 조회
export const fetchReservationHistory = async (id, roomId, userId, bookDate, bookTime, token) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${id}`,{
      id, roomId, userId, bookDate, bookTime
    },    {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰을 포함시킴
        }
      });
    console.log("Reservation History Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservation history:", error);
    throw error;
  }
};


//예약 수정후 업데이트
export const updateReservation = async (bookDate, bookTime, userId, token) => {
  try {
    const response = await axios.patch(`${API_URL}/api/books/${userId}`, {
      bookDate, bookTime, userId
    }, { headers: {
      Authorization: `Bearer ${token}` // 헤더에 토큰을 포함시킴
    }
  });
    console.log("Reservation Update Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
};

