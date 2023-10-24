import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Header2() {
  const navigate = useNavigate(); // 페이지간 이동을 위한 함수 import

  const nickName = "탐나는"; // 사용자의 닉네임을 저장하는 변수

  // 모달창을 띄우기 위한 유즈스테이트
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ButtonAlign>
        {/* // 화면 상단 버튼 레이아웃을 조절하기위함 */}
        <ButtonWrapper>
          {/* //버튼과 닉네임을 감싸는 그룹 */}
          <FloorButton style={{ fontSize: "50px" }}>2F</FloorButton>
          {/* 2층 버튼에 폰트사이즈와 스타일 설정 */}
          <span> I </span>
          <FloorButton
            style={{ color: "lightgrey" }}
            onClick={() => {
              navigate(`/Floor3`); //3층 페이지로 이동하는 이벤트
            }}
          >
            3F
          </FloorButton>
        </ButtonWrapper>
        <button>=</button>
        <span style={{ fontWeight: "bold" }}>
          {nickName ? nickName : ""} 인재님
        </span>
        {/* 삼항연산자 사용하여 인재님의 닉네임을 표시 */}
      </ButtonAlign>
    </>
  );
}

export default Header2;

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
