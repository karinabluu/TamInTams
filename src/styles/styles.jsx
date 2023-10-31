import styled from 'styled-components';

// 로그인 페이지
export const LoginContainer = styled.div`
  width: 800px;
  height: 700px;
  margin: 0 auto;
  position: relative;
  border: 3px solid black;
  margin-top: 30px;
  border-radius: 50px;
  border-width: 100px 5px 5px 5px;
  background-color: white;
`;

export const ErrorMessage = styled.div`
  max-width: 210px;
  color: red;
  font-size: 12px;
  margin: 8px;
  display: flex;
`;

export const LoginRow1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-right: 100px; */
  margin-bottom: 15px;
`;

export const LoginRow2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-right: 130px; */
`;

export const LoginCol = styled.div`
  margin-top: 80px;
`;

export const LoginAllTitle = styled.div`
  margin-top: 100px;
`;

export const LoginTitle = styled.div`
  font-weight: 500;
  font-size: 55px;
  font-weight: bold;
  text-decoration: underline;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
  text-align: center;
  color: black;
`;

export const LoginSubTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  font-weight: border;
  color: black;
  text-align: center;
`;

export const LoginButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
`;

export const LoginBar = styled.div`
  font-weight: 500;
  font-size: 22px;
  color: black;
`;

export const LoginButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  margin-left: 250px;
  color: black;
`;

export const LoginText = styled.div`
  font-size: 30px;
  color: black;
`;

export const Input = styled.input`
  all: unset;
  cursor: pointer;
  margin: 0px 0 0 15px;
  width: 320px;
  height: 40px;
  font-size: 25px;
  letter-spacing: 0.15px;
  text-align: center;
  border-bottom: 3px solid;
  color: black;
  font-weight: bold;
`;

export const ForgetButton = styled.button`
  font-size: 14px;
  all: unset;
  cursor: pointer;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 20px;
`;

// 회원가입 페이지

export const JoinContainer = styled.div`
  min-width: 800px;
  max-width: 1200px;
  text-align: center;
  margin: 130px;
`;

export const JoinRow1 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 196px;
`;

export const JoinRow2 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 176px;
`;

export const JoinRow3 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 128px;
`;

export const JoinRow4 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 148px;
`;

export const JoinSubTitle = styled.div`
  font-weight: 500;
  font-size: 30px;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  color: #424242;
`;

export const JoinTitle = styled.div`
  font-weight: 500;
  font-size: 50px;
  font-weight: bold;
`;

export const JoinText = styled.div`
  font-size: 20px;
  color: #424242;
`;

export const JoinHeader = styled.div`
  margin-top: -20px;
  margin-bottom: 20px;
`;

export const JoinBar = styled.div`
  font-weight: 500;
  font-size: 22px;
`;

export const JoinButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
`;

export const JoinButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  margin-left: 250px;
`;

// 2F / 3F 버튼 디자인

export const Button = styled.div`
  background-color: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

export const HeaderWrap = styled.section`
  display: flex; //
  max-width: 1190px;
  justify-content: space-between;
  margin: auto;
  align-items: baseline;
`;

// 버튼 정렬

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 15px;
`;

// 회의실 버튼 디자인

export const RoomButton = styled.div`
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 9.5px;
  display: flex;
  &:active {
    filter: brightness(60%);
  }
`;

// 회의실 버튼 컬러

export const colorHandler = (color) => {
  switch (color) {
    case 'green':
      return {
        border: '2.8px solid #222222',
        color: '#ffffff',
        backgroundColor: '#02c8be',
      };
    case 'yellow':
      return {
        border: '2.2px solid #222222',
        color: '#ffffff',
        backgroundColor: '#8fdf40',
      };
    case 'transparent':
      return {
        border: '2.8px solid transparent',
        color: '#ffffff',
        backgroundColor: 'transparent', // 배경색을 투명으로 설정
      };
    default:
      return {};
  }
};

// 층별지도 감싸는 div

export const Mapping = styled.section`
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  position: relative;
`;
