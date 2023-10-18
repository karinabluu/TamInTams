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
  const [name, setName] = useState(''); // 사용자 이름 추가
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 서로 다릅니다.');
      return;
    }

    // 회원가입에 필요한 데이터
    const userData = {
      email: id,
      password,
      name, // 사용자 이름 추가
    };

    try {
      // 회원가입 API 엔드포인트와 요청 방식에 맞게 수정
      const response = await axios.post(
        'http://3.36.132.186:3018/api/sign-up',
        userData
      );

      if (response.status === 200) {
        // 회원가입 성공 시 로직을 추가하실 수 있습니다.
        console.log('회원가입 성공:', response.data);
        navigate('/'); // 예를 들어, 회원가입 성공 후 로그인 페이지로 이동
      }
    } catch (error) {
      // 회원가입 실패 시 로직을 추가하실 수 있습니다.
      console.error('회원가입 실패:', error);
      alert('회원가입 실패: ' + error.response.data.message);
    }
  };

  return (
    <St.JoinContainer>
      <St.Header>
        <St.JoinSubTitle>회원가입 페이지</St.JoinSubTitle>
        <St.JoinTitle>회원가입</St.JoinTitle>
      </St.Header>

      <St.Col margin="10px 0 20px">
        <St.JoinText>이메일</St.JoinText>
        <JoinInput
          value={id}
          handleChange={setId}
          errorMessage={'이메일 형식이어야 합니다.'}
        />
      </St.Col>

      <St.Col margin="10px 0 20px">
        <St.JoinText>비밀번호</St.JoinText>
        <JoinInput
          type="password"
          value={password}
          handleChange={setPassword}
          errorMessage={'비밀번호는 6자리 이상이어야 합니다.'}
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
