import React from 'react';
import  utils  from "../utilities";

const PickMe = (props) => {
    return (
        <button key={props.count} className="number" style={{ backgroundColor: colors[props.stat] }}
            onClick={() => props.onNum(props.count, props.stat)}>
            {props.count}</button>
    );
}

const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

const Dot = (props) => {
    return (
        <>
            {utils.range(1, props.no).map(id =>
                <div key={id} className="star" />
            )}
        </>

    );
}

export { PickMe, Dot };