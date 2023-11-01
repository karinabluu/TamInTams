import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../util/token';
import { checkoutUserToken } from '../util/checkoutUserToken';
import * as St from '../styles/styles';

export default function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/');
    }
  }, []);

  const logOutHandler = async () => {
    await checkoutUserToken();
    navigate('/');
  };

  return (
    <St.MainContainer>
      <St.Nav>
        <St.MainTitle></St.MainTitle>
        <St.Button onClick={logOutHandler}>로그아웃</St.Button>
      </St.Nav>
    </St.MainContainer>
  );
}
