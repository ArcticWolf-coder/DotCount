import React, { useState, useEffect } from 'react';
import  utils  from "../utilities";
import { PickMe, Dot } from "./Displays";

const PlayAgain = (props) => {
    return (
        <div className="game-done">
            <h4 className="message"><strong>Game Over! Go again?"</strong></h4>
            <button onClick={props.restart}>Play</button>
        </div>
    );
}

const usePlays = () => {
    // State initialization
    const [dots, setDots] = useState(utils.random(1, 9)); //total dots
    const [aNums, setANums] = useState(utils.range(1, 9)); //available
    const [cNums, setCNums] = useState([]); //candidate
    const [secs, setSecs] = useState(15);

    useEffect(() => {


        if (secs > 0 && aNums.length > 0) {
            const tid = setTimeout(() => { setSecs(secs - 1) }, 1000);
            return () => clearTimeout(tid);
        }

    });
    const setStates = (newCandid) => {
        if (utils.sum(newCandid) !== dots) {
            setCNums(newCandid);
        } else {
            const newAvail = aNums.filter(n => !newCandid.includes(n));
            setDots(utils.randomSumIn(newAvail, 9));
            setANums(newAvail);
            setCNums([]);

        }
    }

    return { dots, aNums, cNums, secs,setStates };
}

const Game = (props) => {

    const { dots, aNums, cNums, secs, setStates } = usePlays();

    //Necessary computations based on state
    const wNum = utils.sum(cNums) > dots;
    const gameStatus = aNums.length == 0 ? 'won' : secs == 0 ? 'lost' : 'active';

    const numState = (num) => {
        if (!aNums.includes(num)) return 'used';
        if (cNums.includes(num)) {
            return wNum ? 'wrong' : 'candidate';
        }
        return 'available';
    }
    //earlier used restart function
    const restart = () => {
        setDots(utils.random(1, 9));
        setANums(utils.range(1, 9));
        setCNums([]);
        setSecs(15);


    };
    const onNumClick = (num, stat) => {
        if (stat === 'used' || gameStatus !== 'active') {
            return;
        }
        const newCandid = (stat === 'available') ?
            cNums.concat(num) : cNums.filter(n => n !== num);

        setStates(newCandid);



    };
    //render return
    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of dotted stars
        </div>
            <div className="body">

                <div className="left">
                    {gameStatus !== 'active' ?
                        <PlayAgain restart={props.reset} gameStatus={gameStatus} />
                        : <Dot no={dots} />
                    }


                </div>
                <div className="right">
                    {utils.range(1, 9).map(num =>
                        <PickMe count={num} onNum={onNumClick} stat={numState(num)} />
                    )}
                </div>
            </div>
            <div className="timer">Seconds Remaining: {secs}</div>
        </div>
    );
};

export default Game;