import React, { useState } from 'react';


// STAR MATCH - Starting Template
const PickMe =(props)=>{
  return (
      <button key={props.count} className="number" style={{backgroundColor: colors[props.stat]}}
      onClick={()=>props.onNum(props.count,props.stat)}>
      {props.count}</button>
  );
}
const Dot=(props)=>{
  return (
    <>
      {utils.range(1,props.no).map( id=> 
        <div key={id} className="star" />
      )}
    </>
  
  );
}
const App = () => {
  const [dots,setDots] = useState(utils.random(1,9));
  const [aNums, setANums] = useState(utils.range(1, 9)); //available
  const [cNums, setCNums] = useState([]); //candidate
  const wNum= utils.sum(cNums)> dots;
  const numState=(num)=>{
    if(!aNums.includes(num)) return 'used';
    if(cNums.includes(num)) {
      return wNum ? 'wrong':'candidate';
    }
    return 'available';
  }
  const onNumClick=(num,stat)=>{
    if(stat==='used'){
      return;
    }
    var newCandid;
    if (stat==='available'){
      newCandid=cNums.concat(num);
    }else {
      newCandid=cNums.filter(n=> !num);
    }
    if(utils.sum(newCandid)!==dots){
      setCNums(newCandid);
    }else {
      const newAvail=aNums.filter(n=>!newCandid.includes(n));
      setANums(newAvail);
      setDots(utils.randomSumIn(newAvail,9));
      setCNums([]);
    }

  }
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of dotted stars
      </div>
      <div className="body">
        <div className="left">    
            <Dot no={dots} />
        </div>
        <div className="right">
          {utils.range(1, 9).map(num =>
            <PickMe count = {num} onNum={onNumClick} stat={numState(num)}/>
          )}
        </div>
      </div>
      <div className="timer">Seconds Remaining: 10</div>
    </div>
  );
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_,i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default  App;

