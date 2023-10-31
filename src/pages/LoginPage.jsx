import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoinInput from '../components/Input/JoinInput';
import { setToken, getToken } from '../util/token';
import * as St from '../styles/styles';
import { validateUserId, validatePassword } from '../util/validation';
import { BGSheet, LoginIcon, PasswordIcon } from '../asset/icon';

export default function LoginPage() {
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate('/'); // floor2
    }
  }, []);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLoginHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: id,
      password,
    };

    try {
      const response = await axios.post(
        'http://3.36.132.186:3018/api/sign-in',
        userData
      );

      if (response.status === 200) {
        setToken(response.data.token);
        console.log('로그인 성공:', response.data.token);
        navigate('/floor2');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 실패: ' + error.response.data.message);
    }
  };

  return (
    <St.LoginContainer>
      <St.LoginAllTitle>
        <St.LoginTitle>TAMINTAMS</St.LoginTitle>
        <St.LoginSubTitle>
          회의실 예약할 땐, 탐나는 인재 탐나는 스페이스
        </St.LoginSubTitle>
      </St.LoginAllTitle>
      <St.LoginCol>
        <St.LoginRow1>
          <St.LoginText>
            <LoginIcon />
          </St.LoginText>
          <JoinInput
            value={id}
            handleChange={setId}
            errorMessage={
              '아이디는 7자리 이상 12자리 이하이며, 특수문자와 한글은 포함되지 않습니다.'
            }
          />
        </St.LoginRow1>

        <St.LoginRow2>
          <St.LoginText>
            <PasswordIcon />
          </St.LoginText>
          <JoinInput
            type="password"
            value={password}
            handleChange={setPassword}
          />
        </St.LoginRow2>

        <St.LoginButtons>
          <St.LoginButton onClick={() => navigate('/join')}>
            회원가입
          </St.LoginButton>
          <St.LoginBar>│</St.LoginBar>
          <St.LoginButton onClick={onLoginHandler}>로그인</St.LoginButton>
        </St.LoginButtons>
        <St.ForgetButton>비밀번호를 잊어버리셨나요?</St.ForgetButton>
      </St.LoginCol>
    </St.LoginContainer>
  );
}
