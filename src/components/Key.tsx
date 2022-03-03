import emoji from "emoji-dictionary";
import { Letter } from "../game";

const Box = ({ letter, onClick }:{letter:Partial<Letter>, onClick:()=>void}) => {
  return (
    <div className={`key ${letter.background}`} onClick={onClick}>
      {emoji.getUnicode(letter.letter)}
    </div>
  );
};

export default Box;
