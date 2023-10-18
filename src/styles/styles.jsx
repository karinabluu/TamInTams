import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    /* background-color: #e5e5e5;
    body {
      margin: 0;
    } */
`;

export const LoginContainer = styled.div`
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

export const JoinContainer = styled.div`
  /* margin: 0 auto;
  padding: 15px;
  width: 700px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000080;
  border: 20px double #e5e5e5; */
`;

export const Header = styled.header`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 10px 0 0 0; */
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

export const Input = styled.input`
  /* margin: 15px 0 0 0;
  width: 370px;
  height: 35px;
  border-radius: 9px;
  border: none;
  font-size: 19px;
  text-align: center; */
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

// Button Theme & Button Components
export const theme = {
  // primary: css`
  //   background-color: white;
  //   color: #000080;
  //   border-radius: 7px;
  //   height: 40px;
  // `,
  // secondary: css`
  //   background-color: #dc143c;
  //   color: #e5e5e5;
  //   border-radius: 7px;
  //   height: 40px;
  //   border: 2px solid #000080;
  // `,
  // thirdy: css`
  //   background-color: #000080;
  //   color: #e5e5e5;
  // `,
};

export const Button = styled.button`
  /* margin: 0 8px 0 8px;
  width: 140px;
  height: 35px;
  border: none;
  border-radius: 7px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }

  ${({ buttontheme }) => buttontheme === 'primary' && theme.primary};
  ${({ buttontheme }) => buttontheme === 'secondary' && theme.secondary};
  ${({ buttontheme }) => buttontheme === 'thirdy' && theme.thirdy}; */
`;
Button.shouldForwardProp = (prop) => prop !== 'buttontheme';

// export const Footer = styled.footer`
//   padding: 21px;
//   height: 50px;
//   position: relative;
//   color: gray;
//   font-weight: 700;
//   font-size: 13.2px;
// `;

export const Col = styled.div`
  /* display: flex;
  flex-direction: column;
  margin: ${(props) => props && props.margin}; */
`;

export const ErrorMessage = styled.div`
  /* max-width: 250px;
  color: red;
  font-size: 12px;
  margin: 4px; */
`;

export const LoginSubTitle = styled.div`
  /* font-weight: 700;
  font-size: 20px;
  color: #000080; */
`;

export const LoginTitle = styled.div`
  /* font-weight: 500;
  font-size: 50px;
  color: #000080; */
`;

export const LoginText = styled.div`
  /* font-weight: 600;
  font-size: 20px;
  color: #000080;
  width: 40%;
  margin-left: -95px; */
`;

export const Row = styled.div`
  /* display: flex;
  align-items: center; */
`;

export const JoinSubTitle = styled.div`
  /* font-size: 18px;
  color: white;
  padding-top: 70px; */
`;

export const JoinTitle = styled.div`
  /* font-weight: 400;
  font-size: 45px;
  color: white; */
`;

export const JoinText = styled.div`
  /* font-weight: 500;
  font-size: 18px;
  color: white;
  font-weight: 100;
  margin-left: -100px;
  width: 40%; */
`;

export const JoinButton = styled.div`
  /* padding-bottom: 70px; */
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
