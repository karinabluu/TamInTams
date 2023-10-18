import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../util/token';
import { getToken } from '../util/token';
import * as St from '../styles/styles';
import { User, UserCircle, Lock } from '../asset/Icon';

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

    try {
      // 백엔드의 로그인 API 엔드포인트와 요청 방식에 맞게 수정
      const response = await axios.post('백엔드_로그인_API_URL', {
        id,
        password,
      });

      if (response.status === 200) {
        // 백엔드에서 인증 토큰을 반환하면, 이를 저장하도록 수정
        setToken(response.data.token);
        navigate('/main');
      }
    } catch (error) {
      console.error(error);
      alert('로그인 실패: ' + error.response.data.message);
    }
  };

  return (
    <St.LoginContainer>
      <St.Header>
        <UserCircle />
        {/* <img src="img/lycos.webp" alt="img" style={{ width: "300px" }} /> */}
        <St.LoginSubTitle>open 08:30 close 21:00</St.LoginSubTitle>
        <St.LoginTitle></St.LoginTitle>
      </St.Header>
      <St.Body>
        <St.PostWrap>
          <St.Row>
            <St.LoginText></St.LoginText>
            <User />
            <St.InputId
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </St.Row>
          <St.Row>
            <St.LoginText></St.LoginText> <Lock />
            <St.InputPw
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </St.Row>
        </St.PostWrap>
        <St.BtnWrap>
          <St.Button
            onClick={() => {
              navigate('/join');
            }}
          >
            회원가입
          </St.Button>
          <St.Button onClick={onLoginHandler}>로그인</St.Button>
        </St.BtnWrap>
      </St.Body>
    </St.LoginContainer>
  );
}
