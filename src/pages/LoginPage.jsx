import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoinInput from '../components/Input/JoinInput';
import { setToken, getToken } from '../util/token';
import * as St from '../styles/styles';

export default function LoginPage() {
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate('/main');
    }
  }, []);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 사용자 정보 저장 관련 코드 (API)
  // const checkUser = async () => {
  //   try {
  //     const response = await axios.get('http://3.38.191.164/user', {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     console.log(response.data.message, response);
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.response.data.message);
  //   }
  // };

  // const onLoginHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://3.38.191.164/login', {
  //       id,
  //       password,
  //     });
  //     console.log(response.statusText, response);

  //     if (response.status === 201) {
  //       setToken(response.data.token);
  //       checkUser();
  //       navigate('/main');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.response.data.message);
  //   }
  // };

  const onLoginHandler = async (e) => {
    e.preventDefault();

    // 로그인에 필요한 데이터
    const userData = {
      email: id,
      password,
    };

    try {
      // 로그인 API 엔드포인트와 요청 방식에 맞게 수정
      const response = await axios.post(
        'http://3.36.132.186:3018/api/sign-in',
        userData
      );

      if (response.status === 200) {
        // 로그인 성공 시 받은 토큰을 저장하고 로직을 추가하실 수 있습니다.
        setToken(response.data.token);
        console.log('로그인 성공:', response.data);
        navigate('/main'); // 예를 들어, 로그인 성공 후 메인 페이지로 이동
      }
    } catch (error) {
      // 로그인 실패 시 로직을 추가하실 수 있습니다.
      console.error('로그인 실패:', error);
      alert('로그인 실패: ' + error.response.data.message);
    }
  };

  return (
    <St.LoginContainer>
      <St.Header>
        <St.JoinSubTitle>open 08:30 close 21:00</St.JoinSubTitle>
        <St.LoginTitle>로그인 페이지</St.LoginTitle>
      </St.Header>

      <St.Col margin="10px 0 20px">
        <St.JoinText>아이디</St.JoinText>
        <JoinInput
          value={id}
          handleChange={setId}
          errorMessage={
            '아이디는 7~12자리 이상이며 특수문자와 한글은 포함되지 않습니다.'
          }
        />
      </St.Col>

      <St.Col margin="10px 0 20px">
        <St.JoinText>비밀번호</St.JoinText>
        <JoinInput
          type="password"
          value={password}
          handleChange={setPassword}
          errorMessage={
            '비밀번호는 6자리 이상이며, 특수문자 1개가 포함되어야합니다.'
          }
        />
      </St.Col>

      <St.JoinButton>
        <St.Button onClick={() => navigate('/join')}>회원가입</St.Button>
        <St.Button onClick={onLoginHandler}>로그인</St.Button>
      </St.JoinButton>
    </St.LoginContainer>
  );

  // return (
  //   <St.LoginContainer>
  //     <St.Header>
  //       <UserCircle />
  //       {/* <img src="img/lycos.webp" alt="img" style={{ width: "300px" }} /> */}
  //       <St.LoginSubTitle>open 08:30 close 21:00</St.LoginSubTitle>
  //       <St.LoginTitle></St.LoginTitle>
  //     </St.Header>
  //     <St.Body>
  //       <St.PostWrap>
  //         <St.Row>
  //           <St.LoginText></St.LoginText>
  //           <User />
  //           <St.InputId
  //             type="text"
  //             value={id}
  //             onChange={(e) => setId(e.target.value)}
  //           />
  //         </St.Row>
  //         <St.Row>
  //           <St.LoginText></St.LoginText> <Lock />
  //           <St.InputPw
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //         </St.Row>
  //       </St.PostWrap>
  //       <St.BtnWrap>
  //         <St.Button
  //           onClick={() => {
  //             navigate('/join');
  //           }}
  //         >
  //           회원가입
  //         </St.Button>
  //         <St.Button onClick={onLoginHandler}>로그인</St.Button>
  //       </St.BtnWrap>
  //     </St.Body>
  //   </St.LoginContainer>
  // );
}
