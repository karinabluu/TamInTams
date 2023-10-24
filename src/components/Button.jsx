import React from 'react';
import styled from 'styled-components';

// Button 컴포넌트

function Button({ size, color, icon, onClick, children }) {
  // 스타일드 컴포넌트 사용
  const Button = styled.div`
    ${() => colorHandler(color)}; // 색상설정
    ${() => sizeHandler(size)}; // 크기설정
    border-radius: 7px; // 모서리 둥글게
    display: flex; // 가로정렬
    justify-content: center; // 수평정렬
    align-items: center; // 수직정렬
    font-size: 13px; // 폰트크기
    font-weight: bold; // 글씨굵기
    color: #ffffff;
    cursor: pointer; // 커서스타일을 포인터로
    &:active {
      // 클릭시 활성상태
      filter: brightness(60%); // 밝기60%로 클릭시 어둡게 표시
    }
  `;

  // colorHandler 함수는 color 매개변수에 따라 버튼의 색상 스타일을 설정합니다.
  const colorHandler = (color) => {
    switch (color) {
      case 'green':
        return `border: 1.6px solid #000000; background-color: #02c8be`; // Primary 버튼 스타일
      case 'yellow':
        return `border: 1.6px solid #000000; color: #000000; background-color: #8fdf40`; // Negative 버튼 스타일
    }
  };

  // sizeHandler 함수는 size 매개변수에 따라 버튼의 크기 스타일을 설정합니다.
  const sizeHandler = (size) => {
    switch (size) {
      case 'm2':
        return `width: 79px; height: 100px;`; // 2층 회의실 크기
      case 'm3':
        return `width: 100px; height: 71px;`; // 3층 회의실 크기
      case 'na2':
        return `width: 30px; height: 55px;`; // 2층 나박스 크기
      case 'na3':
        return `width: 55px; height: 48px;`; // 2층 나박스 크기
      case 'big':
        return `width 40px; height: 120px;`; // 3층 대회의실 크기
    }
  };

  return (
    <>
      {/* 버튼을 렌더링하고 클릭 이벤트를 처리할 수 있도록 설정. */}
      <Button onClick={onClick}>
        {children}&nbsp;{icon}
      </Button>
    </>
  );
}

export default Button;
