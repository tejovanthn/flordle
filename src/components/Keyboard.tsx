import React from "react";
import { Actions, Letter } from "../game";
import Key from "./Key";

const Keyboard = ({ dispatch, keys }:{dispatch:any, keys:Letter[]}) => {
  return (
    <div className="keyboard">
      <div className="keys">
        {keys.map((letter, idx) => (
          <Key
            letter={letter}
            onClick={() =>
              dispatch({ type: Actions.ADD_LETTER, letter: letter.letter })
            }
            key={idx}
          />
        ))}
      </div>
      <div className="controls">
        <Key
          letter={{ letter: "arrows_counterclockwise" }}
          onClick={() => dispatch({ type: Actions.CLEAR })}
        />
        <Key
          letter={{ letter: "arrow_forward" }}
          onClick={() => dispatch({ type: Actions.CHECK })}
        />
      </div>
    </div>
  );
};

export default React.memo(Keyboard);
