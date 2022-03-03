import React from "react";
import { Guess } from "../game";
import BoxLine from "./BoxLine";

const BoxGrid = ({ guesses }:{guesses:Guess[]}) => {
  return (
    <div className="boxgrid">
      {guesses.map((guess, idx) => (
        <BoxLine guess={guess} key={idx} />
      ))}
    </div>
  );
};

export default React.memo(BoxGrid);
