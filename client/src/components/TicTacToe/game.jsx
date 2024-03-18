import React, { useRef, useState } from 'react';
import "./game.css";
import circleIcon from "../../assets/circle.png";
import crossIcon from "../../assets/cross.png";
import Leave from './Leave';

let data = ["","","","","","","","",""];

const useBoxRefs = (count) => {
    const boxRefs = useRef(Array(count).fill(null).map(() => React.createRef()));
    return boxRefs.current;
};

function Game() {

    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);

    const boxArray = useBoxRefs(9);

    const toggle = (e, num) => {
        if(lock || data[num] !== "") {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${crossIcon}'>`;
            data[num] = "x";
            setCount(++count);
            
        } 
        else {
            e.target.innerHTML = `<img src='${circleIcon}'>`;
            data[num] = "o";
            setCount(++count);
        }
        checkWin();
    }

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }
    }
    
    const won = (winner) => {
        setLock(true);
        if(winner === "x") {
            titleRef.current.innerHTML = `Congratulations: <img className="winner-icon" src=${crossIcon}> win!`;
        } else {
            titleRef.current.innerHTML = `Congratulations: <img className="winner-icon" src=${circleIcon}> win!`;
        }
    }

    const reset = () => {
        setLock(false);
        data = ["","","","","","","","",""];
        titleRef.current.innerHTML = "Tic-Tac-Toe";
        boxArray.map((e) => {
            e.current.innerHTML = "";
        })
    }

  return (
    <div className='container'>
    <h1 className="title" ref={titleRef}>Tic-Tac-Toe</h1>
    <div className="participants">
        <p>You <img src={crossIcon} alt="Cross" /></p>
        <p>Opponent <img src={circleIcon} alt="Circle" /></p>
    </div>
    <div className="board">
        <div className="row1">
            {boxArray.slice(0, 3).map((box, index) => (
                <div className="boxes" key={index} ref={box} onClick={(e) => toggle(e, index)}></div>
            ))}
        </div>
        <div className="row2">
            {boxArray.slice(3, 6).map((box, index) => (
                <div className="boxes" key={index + 3} ref={box} onClick={(e) => toggle(e, index + 3)}></div>
            ))}
        </div>
        <div className="row3">
            {boxArray.slice(6).map((box, index) => (
                <div className="boxes" key={index + 6} ref={box} onClick={(e) => toggle(e, index + 6)}></div>
            ))}
        </div>
    </div>
        <button className="reset" onClick={() => {reset()}}>reset</button>
        <Leave />
    </div>
  )
}

export default Game;