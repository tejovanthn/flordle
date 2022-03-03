import { Guess } from "../game";
import Box from "./Box";

const BoxLine = ({ guess }:{guess:Guess}) => {
  return (
    <div className="boxline">
      {guess.map((letter, idx) => (
        <Box letter={letter} key={idx} />
      ))}
    </div>
  );
};

export default BoxLine;
