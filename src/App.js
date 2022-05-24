import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";

import DailyScore from "./DailyScore";
import Detail from "./Detail";

function App() {
  const [number, setNumber] = useState(0);
  const [average, setAverage] = useState(0);

  const countRef = useRef(0);

  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

  // 1. 자식에게 함수를 넘겨주고 파라미터로 데이터를 받아온다.
  // 2. average에 그 값을 합산한다.
  // 3. 회차마다 ref를 1씩 증가시키고 ref가 7 이상이라면 초기화한다.
  const getNumber = (number) => {
    if (countRef.current >= 7) {
      countRef.current = 0;
      setAverage(0);
    }

    setNumber(number);
    setAverage((average) => average + number + 1);
    countRef.current += 1;
  };

  const reset = () => {
    countRef.current = 0;
    setAverage(0);
  };

  return (
    <AppWrap className="App">
      <Container>
        <Route path="/" exact>
          {/* 월~일까지의 컴포넌트를 생성한다. */}
          <Title>내 일주일은?</Title>
          {weekdays.map((day) => {
            return (
              <DailyScore
                number={number}
                getNumber={getNumber}
                day={day}
                key={day}
              />
            );
          })}
          <Title>
            평균 평점 <br />
            {(average / 7).toFixed(1)}
          </Title>
          <button onClick={reset}>리셋</button>
        </Route>
        <Route path="/detail">
          <Detail />
        </Route>
      </Container>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  background-color: #e3f2fd;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
  background-color: #fff;
  width: 50vw;
  max-width: 350px;
  margin: 10px auto 0 auto;
  height: 80vh;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;

  button {
    display: block;
    cursor: pointer;
    padding: 10px;
    margin: auto;
    width: 55%;
    color: white;
    font-weight: bold;
    border: 0;
    border-radius: 10px;
    background-color: #2196f3;
  }
`;
const Title = styled.h2`
  text-align: center;
`;
