import styled from 'styled-components';

// 로그인 페이지

export const LoginContainer = styled.div`
  min-width: 800px;
  max-width: 1200px;
  text-align: center;
  margin: 130px;
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
  margin-right: 100px;
`;

export const LoginRow2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 130px;
`;

export const LoginCol = styled.div`
  padding: 70px;
`;

export const LoginTitle = styled.div`
  font-weight: 500;
  font-size: 55px;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-thickness: 1px;
`;

export const LoginSubTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  font-weight: border;
  color: #424242;
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
`;

export const LoginButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  margin-left: 250px;
`;

export const Button = styled.button``;

export const LoginText = styled.div`
  font-size: 30px;
  color: #424242;
`;

export const Input = styled.input`
  margin: 15px 0 0 15px;
  width: 400px;
  height: 40px;
  font-size: 30px;
  text-align: center;
  border-width: 3px;
  border-radius: 20px;
  border-color: #808080;
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
  margin-left: 324px;
`;

export const JoinRow2 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 304px;
`;

export const JoinRow3 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 256px;
`;

export const JoinRow4 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 276px;
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

export const MainContainer = styled.div`
  /* margin: 0 auto;
  padding: 15px;
  width: 700px;
  height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 150px;
  align-items: center;
  background-color: #e5e5e5; */
`;

export const Nav = styled.header`
  /* display: flex;
  justify-content: space-between;
  width: 1280px;
  padding: 10px;
  border-bottom: 1px solid lightgray; */
`;

export const Title = styled.h4`
  /* font-weight: 700;
  color: #000080; */
`;

export const Body = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 10px 0 0 0; */
`;

export const PostWrap = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  width: 270px;
  height: 130px;
  padding: 30px;
  margin: 40px 0 20px 0;
  border-bottom: 3px solid lightgray; */
`;

export const InputId = styled(Input)`
  /* background-position: 7px center;
  background-repeat: no-repeat;

  &:focus {
    background-image: none;
    background-position: -10px center;
    text-indent: 0;
  } */
`;

export const InputPw = styled(Input)`
  /* background-position: 7px center;
  background-repeat: no-repeat;

  &:focus {
    background-image: none;
    background-position: -10px center;
    text-indent: 0;
  } */
`;

export const BtnWrap = styled.div`
  /* display: flex;
  align-items: center;
  margin: 0 0 0 0; */
`;

export const Col = styled.div`
  /* display: flex;
  flex-direction: column;
  margin: ${(props) => props && props.margin}; */
`;

export const MainTitle = styled.div`
  /* font-weight: 400;
  font-size: 30px;
  color: #000080;
  margin-left: 500px;
  margin-top: 20px; */
`;

export const MainButton = styled.button`
  /* background-color: #000080;
  border-radius: 15px;
  margin-left: 5px;
  margin-right: 5px;
  width: 300px;
  height: 500px;
  cursor: pointer;
  margin-top: 35px; */
`;

export const MainSubTitle = styled.div`
  /* font-size: 50px;
  font-weight: 700;
  color: white; */
`;

export const MainText = styled.div`
  /* font-weight: 800;
  font-size: 100px;
  color: white;
  margin-left: -100px; */
`;
