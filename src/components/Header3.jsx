import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Header3() {
  const navigate = useNavigate(); // 페이지간 이동
  const nickName = '탐나는';

  return (
    <>
      <ButtonAlign>
        <ButtonWrapper>
          <FloorButton style={{ fontSize: '50px' }}>3F</FloorButton>
          <span> I </span>
          <FloorButton
            style={{ color: 'lightgrey' }}
            onClick={() => {
              navigate(`/floor2`);
            }}
          >
            2F
          </FloorButton>
        </ButtonWrapper>
        <span style={{ fontWeight: 'bold' }}>
          {nickName ? nickName : ''} 인재님
        </span>
      </ButtonAlign>
    </>
  );
}

export default Header3;

// 2F / 3F 버튼 설정
const FloorButton = styled.div`
  background-color: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 15px;
`;

const ButtonAlign = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 15px;
`;
