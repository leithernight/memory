import React, { Component, useEffect, useState } from "react";
import Card from "../Card/Card";
import {images, backImg} from "../../data/Data";
import Timer from "../Timer/Timer";
import "./Desk.css";
import "../Button/Button.css";
import Counter from "../Counter/Counter";

interface DeskProps {
  size: string
}

interface CardData {
  index: number
  status: number
}

function GenerateArray(size: number): CardData[] {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push({index: i, status: 1}, {index: i, status: 1}) 
  }
  return arr.sort(() => Math.random() - 0.5)
}

export default function Desk({size}: DeskProps) {
  const [count, setCount] = useState(0);
  let [cards, setCards] = useState((size === 'sm' && GenerateArray(6)) || (size === 'md' && GenerateArray(10)) || (GenerateArray(15)));
  const [prev, setPrev] = useState<number>(-1);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);

  if (!started && cards.filter(card => card.status === 0).length === cards.length) setStarted(true)

  useEffect(() => {
    setTimeout(() => {
      for (let i = 0; i < cards.length; i++) {
        cards[i].status = 0;
      }
      setCards([...cards])
    },2000)
  }, [])

  useEffect(
    () => {
        if (started) {
        const intervalId = setInterval(() => {
          setTime(time + 1);
        }, 1000);
        return () => {
          clearInterval(intervalId);
        }
      }
      }, [time, started]
  )

  function GenerateCard(num: CardData, index: number) {
    return <Card key={index} img={images.URL_ICON + images.icons[num.index]} name={''} backImg={backImg} status={num.status} onClick={onClickCard} id={index}/>
  }

  function addCount() {
    setCount(count + 1)
  }
  
  function onClickCard(key: number) {
    if (cards[key].status === 0) {
      cards[key].status = 1
      if (prev === -1) {
        setPrev(key)
        setCards([...cards])
      } else if (prev !== -1) {
        addCount(); 
        if (cards[prev].index === cards[key].index && prev !== key) {
          cards[prev].status = 2
          cards[key].status = 2
          setPrev(-1)
          let audio = new Audio('/sounds/success.mp3')
          audio.play()
          setCards([...cards])
          if (cards.filter(card => card.status !== 2).length === 0) setStarted(false);
        } else {
          let audio = new Audio('/sounds/fail.mp3')
          audio.play()
          let wrong = [prev, key];
          setPrev(-1)
          setTimeout(() => {
            wrong.forEach((num) => cards[num].status = 0)
            setCards([...cards])
          }, 500)
        }
      }
    }
  }
  
  if (cards.filter(card => card.status !== 2).length !== 0) {
    if (size === "md") { 
      return (
        <div>
          <Timer time={time} />
          <Counter value={count} />
          <ul className="desk" style={{gridTemplateColumns: 'repeat(5, 150px)', gridTemplateRows: 'repeat(4, 150px)'}}>
              {cards.map((num, index) => GenerateCard(num, index))}
          </ul>
        </div>
      )
    } else if (size === "lg") { 
        return (
          <div>
            <Timer time={time} />
            <Counter value={count} />
            <ul className="desk" style={{gridTemplateColumns: 'repeat(6, 150px)', gridTemplateRows: 'repeat(5, 150px)'}}>
                {cards.map((num, index) => GenerateCard(num, index))}
            </ul>
          </div>
        )  
    } else { 
        return (
          <div>
            <Timer time={time} />
            <Counter value={count} />
            <ul className="desk" style={{gridTemplateColumns: 'repeat(4, 150px)', gridTemplateRows: 'repeat(3, 150px)'}}>
                {cards.map((num, index) => GenerateCard(num, index))}
            </ul>
          </div>
        )
    }
  } else {
    return (
      <div>
        <h1>You win</h1>
        <p>Time: {time} seconds</p>
        <p>Moves: {count}</p>
        <button className="restart" onClick={() => window.location.reload()}>Restart</button>
      </div>
    )
  }
}