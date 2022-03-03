import emoji from "emoji-dictionary";
import { Letter } from "../game";

const Box = ({ letter }: { letter: Letter }) => {
  return (
    <div className={`box ${letter.background}`}>
      {letter.letter === "desert" ? "" : emoji.getUnicode(letter.letter)}
    </div>
  );
};

export default Box;
