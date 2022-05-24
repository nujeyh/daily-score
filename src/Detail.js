import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

const Detail = () => {
  let history = useHistory();
  const location = useLocation();
  const day = location.state.day;

  const [clicked, setClicked] = useState([false, false, false, false, false]);

  // index까지 동그라미의 클릭 상태를 바꿔준다.
  const handleClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  return (
    <Container>
      <Title>
        <span>{day}요일</span> 평점 남기기
      </Title>
      <ScoreContainer>
        {[0, 1, 2, 3, 4].map((event, index) => {
          return (
            <Circle
              key={index}
              onClick={() => handleClick(event)}
              style={
                clicked[index] === false
                  ? { backgroundColor: "#dddd" }
                  : { backgroundColor: "#ffb74d" }
              }
            />
          );
        })}
      </ScoreContainer>

      <button
        onClick={() => {
          history.goBack();
        }}
      >
        평점 남기기
      </button>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  text-align: center;
  align-items: center;

  button {
    padding: 10px;
    width: 55%;
    margin: 20px;
    color: white;
    font-weight: bold;
    border: 0;
    border-radius: 10px;
    background-color: #2196f3;
    cursor: pointer;
  }
`;

const Title = styled.h2`
  text-align: center;
  span {
    background-color: #e1f5fe;
    border-radius: 5px;
    padding: 2px 3px;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 30px;
`;
