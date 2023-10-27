import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getToken } from "../util/token";
import * as St from "../styles/styles";
import axios from "axios";

// 룸버튼 크기
const sizeHandler = (size) => {
  switch (size) {
    case "large":
      return {
        width: "125px",
        height: "83px",
      };
    case "small":
      return {
        width: "62px",
        height: "58px",
      };
    case "xlarge":
      return {
        width: "102px",
        height: "198px",
      };
    default:
      return {};
  }
};

const size = ["large", "small", "xlarge"];
const color = ["green", "yellow", "transparent"];

const roomData2 = [
  { name: "다랑쉬오름", sizeHandler: 0, colorHandler: 0 },
  { name: "용눈이오름", sizeHandler: 0, colorHandler: 0 },
  { name: "따라비오름", sizeHandler: 0, colorHandler: 0 },
  { name: "Na1", sizeHandler: 1, colorHandler: 1 },
  { name: "Na2", sizeHandler: 1, colorHandler: 1 },
  { name: "Na3", sizeHandler: 1, colorHandler: 1 },
  { name: "거문오름", sizeHandler: 2, colorHandler: 0 },
];

const Floor3img = styled.div`
  background-image: url("/Floor3.png");
  height: 600px;
  background-repeat: no-repeat;
  background-position: center;
`;

const ButtonsColumns = styled.section`
  display: flex;
  flex-direction: column; //
  max-width: 758px;
  justify-content: space-between;
  margin: auto;
`;

const ButtonsColumns2 = styled.section`
  display: flex;
  flex-direction: column; //
  max-width: 758px;
  justify-content: space-between;
  margin: auto;
  top: -1061px;
  left: 482px;
  position: relative;
`;

const ButtonsSpace = styled.section`
  position: relative;
  top: -538px;
  left: 828px;
`;

const ButtonsSpace2 = styled.section`
  position: relative;
  top: -800px;
  left: 640px;
`;

const Floor3 = () => {
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
          <St.Button style={{ fontSize: "50px" }}>3F</St.Button>
          <span> I </span>
          <St.Button
            style={{ color: "lightgrey" }}
            onClick={() => {
              navigate("/Floor2"); //2층 페이지로 이동하는 이벤트
            }}
          >
            2F
          </St.Button>
        </St.ButtonWrapper>
        <St.Button onClick={logOutHandler}>탐나는 인재님</St.Button>
      </St.HeaderWrap>
      <Floor3img />
      <ButtonsSpace>
        <ButtonsColumns style={{ marginBottom: "46px" }}>
          {roomData2.slice(0, 3).map((room, index) => (
            <St.RoomButton
              key={index}
              style={{
                ...sizeHandler(size[room.sizeHandler]),
                ...St.colorHandler(color[room.colorHandler]),
              }}
            >
              {room.name}
            </St.RoomButton>
          ))}
        </ButtonsColumns>
      </ButtonsSpace>
      <ButtonsSpace2>
        <ButtonsColumns style={{ marginBottom: "46px" }}>
          {roomData2.slice(3, 6).map((room, index) => (
            <St.RoomButton
              key={index}
              style={{
                ...sizeHandler(size[room.sizeHandler]),
                ...St.colorHandler(color[room.colorHandler]),
              }}
            >
              {room.name}
            </St.RoomButton>
          ))}
        </ButtonsColumns>
      </ButtonsSpace2>
      <ButtonsColumns2>
        {roomData2.slice(6, 7).map((room, index) => (
          <St.RoomButton
            key={index}
            style={{
              ...sizeHandler(size[room.sizeHandler]),
              ...St.colorHandler(color[room.colorHandler]),
            }}
          >
            {room.name}
          </St.RoomButton>
        ))}
      </ButtonsColumns2>
    </>
  );
};

export default Floor3;
