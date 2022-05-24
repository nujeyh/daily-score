import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const DailyScore = ({ day, getNumber }) => {
  let history = useHistory();
  const [score, setScore] = useState([false, false, false, false, false]);

  // 동그라미의 상태를 랜덤으로 설정해준다.
  const randomScore = () => {
    let scoreStates = [...score];
    const random = Math.floor(Math.random() * 5);
    for (let i = 0; i < 5; i++) {
      scoreStates[i] = i <= random ? true : false;
    }
    setScore(scoreStates);

    // 설정한 랜덤 점수값을 부모에게 넘겨준다.
    getNumber(random);
  };

  useEffect(() => {
    randomScore();
  }, []);

  return (
    <DayContainer>
      <p>{day}</p>
      {[0, 1, 2, 3, 4].map((index) => {
        return (
          <Circle
            key={index}
            style={
              score[index] === false
                ? { backgroundColor: "#dddd" }
                : { backgroundColor: "#ffb74d" }
            }
          />
        );
      })}
      <Arrow
        onClick={() => {
          // history.push()로 props 넘기기
          history.push({
            pathname: "/detail",
            state: { day: day },
          });
        }}
      />
    </DayContainer>
  );
};

export default DailyScore;

const DayContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100fr;
  margin: 10px;

  p {
    margin: auto 3px;
    font-weight: bold;
  }
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 30px;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #2196f3;
  cursor: pointer;
`;
