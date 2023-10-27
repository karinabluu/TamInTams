import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getToken } from "../util/token";
import * as St from "../styles/styles";
import axios from "axios";

const sizeHandler = (size) => {
  switch (size) {
    case "large":
      return {
        width: "93px",
        height: "125px",
      };
    case "small":
      return {
        width: "40px",
        height: "60px",
      };
    default:
      return {};
  }
};

const roomData = [
  { name: "협재", sizeHandler: "large", colorHandler: "green" },
  { name: "곽지", sizeHandler: "large", colorHandler: "green" },
  { name: "이호", sizeHandler: "large", colorHandler: "green" },
  { name: "함덕", sizeHandler: "large", colorHandler: "green" },
  { name: "월평", sizeHandler: "large", colorHandler: "green" },
  { name: "김녕", sizeHandler: "large", colorHandler: "green" },
  { name: "신양", sizeHandler: "large", colorHandler: "green" },
  { name: "", sizeHandler: "large", colorHandler: "transparent" },
  { name: "하모", sizeHandler: "large", colorHandler: "green" },
  { name: "화순", sizeHandler: "large", colorHandler: "green" },
  { name: "중문", sizeHandler: "large", colorHandler: "green" },
  { name: "표선", sizeHandler: "large", colorHandler: "green" },
  { name: "Na1", sizeHandler: "small", colorHandler: "yellow" },
  { name: "Na2", sizeHandler: "small", colorHandler: "yellow" },
  { name: "Na3", sizeHandler: "small", colorHandler: "yellow" },
  { name: "", sizeHandler: "small", colorHandler: "transparent" },
  { name: "Na4", sizeHandler: "small", colorHandler: "yellow" },
  { name: "Na5", sizeHandler: "small", colorHandler: "yellow" },
  { name: "Na6", sizeHandler: "small", colorHandler: "yellow" },
];

const Floor2img = styled.div`
  background-image: url("/Floor2.png");
  background-position: center;
  height: 600px;
  background-repeat: no-repeat;
`;

const ButtonsRows = styled.section`
  display: flex; //
  align-items: stretch;
  max-width: 758px;
  justify-content: space-between;
  margin: auto;
`;

// const ButtonsRows2 = styled.section`
//   display: flex; //
//   max-width: 758px;
//   justify-content: space-between;
//   margin: auto;
//   position: relative;
//   top: 39px;
// `;

const ButtonColumns = styled.section`
  position: relative;
  top: -538px;
`;

const Floor2 = () => {
  const navigate = useNavigate(); // 페이지간 이동을 위한 함수 import

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, []);

  const logOutHandler = async () => {
    const token = getToken();
    console.log(token);
    try {
      await axios.post("http://3.36.132.186:3018/api/log-out", null, {
        headers: { Authorization: token },
      });
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <>
      <St.HeaderWrap>
        <St.ButtonWrapper>
          <St.Button style={{ fontSize: "50px" }}>2F </St.Button>
          <span> I </span>
          <St.Button
            style={{ color: "lightgrey" }}
            onClick={() => {
              navigate("/Floor3"); //3층 페이지로 이동하는 이벤트함수 처리 필요함
            }}
          >
            3F
          </St.Button>
        </St.ButtonWrapper>
        <St.Button onClick={logOutHandler}>탐나는 인재님</St.Button>
      </St.HeaderWrap>
      <Floor2img />
      <ButtonColumns>
        <ButtonsRows style={{ marginBottom: "36px" }}>
          {roomData.slice(0, 7).map((room, index) => (
            <St.RoomButton
              key={index}
              style={{
                ...sizeHandler(room.sizeHandler),
                ...St.colorHandler(room.colorHandler),
              }}
              onClick={() => {
                if (room.name === "협재") {
                  alert("협재 버튼을 클릭했어요");
                } else if (room.name === "곽지") {
                  alert("곽지 버튼을 클릭했어요");
                }
              }}
            >
              {room.name}
            </St.RoomButton>
          ))}
        </ButtonsRows>
        <ButtonsRows>
          {roomData.slice(7, 16).map((room, index) => (
            <St.RoomButton
              key={index}
              style={{
                ...sizeHandler(room.sizeHandler),
                ...St.colorHandler(room.colorHandler),
              }}
            >
              {room.name}
            </St.RoomButton>
          ))}
        </ButtonsRows>
        {/* <ButtonsRows2>
          {roomData.slice(16).map((room, index) => (
            <St.RoomButton
              key={index}
              style={{
                ...sizeHandler(room.sizeHandler),
                ...St.colorHandler(room.colorHandler),
              }}
            >
              {room.name}
            </St.RoomButton>
          ))}
        </ButtonsRows2> */}
      </ButtonColumns>
    </>
  );
};

export default Floor2;
