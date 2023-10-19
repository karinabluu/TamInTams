import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoinInput from '../components/Input/JoinInput';
import { getToken } from '../util/token';
import * as St from '../styles/styles';

export default function JoinPage() {
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate('/main');
    }
  }, []);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 서로 다릅니다.');
      return;
    }

    const userData = {
      email: id,
      password,
      name,
    };

    try {
      const response = await axios.post(
        'http://3.36.132.186:3018/api/sign-up',
        userData
      );

      if (response.status === 200) {
        console.log('회원가입 성공:', response.data);
        navigate('/');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <St.JoinContainer>
      <St.Header>
        <St.JoinSubTitle></St.JoinSubTitle>
        <St.JoinTitle></St.JoinTitle>
      </St.Header>

      <St.Col margin="10px 0 20px">
        <St.JoinText>아이디</St.JoinText>
        <JoinInput
          value={id}
          handleChange={setId}
          errorMessage={
            '아이디는 7자리 이상 12자리 이하이며, 특수문자와 한글은 포함되지 않습니다.'
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
            '비밀번호는 8자리 이상이며, 특수문자가 1개 이상 포함되어야 합니다.'
          }
        />
      </St.Col>

      <St.Col margin="10px 0 20px">
        <St.JoinText>비밀번호 확인</St.JoinText>
        <St.Input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {password === passwordConfirm || (
          <St.ErrorMessage>비밀번호가 일치하지 않습니다.</St.ErrorMessage>
        )}
      </St.Col>

      <St.Col margin="10px 0 20px">
        <St.JoinText>사용자 이름</St.JoinText>
        <St.Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name.trim() === '' && (
          <St.ErrorMessage>사용자 이름을 입력하세요.</St.ErrorMessage>
        )}
      </St.Col>

      <St.JoinButton>
        <St.Button onClick={() => navigate('/')}>이전으로</St.Button>
        <St.Button onClick={onSubmitHandler}>가입완료</St.Button>
      </St.JoinButton>
    </St.JoinContainer>
  );
}
