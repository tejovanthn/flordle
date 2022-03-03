import "./styles.css";
import Header from "./components/Header";
import BoxGrid from "./components/BoxGrid";
import Keyboard from "./components/Keyboard";
import React, { useReducer } from "react";
import { reducer, initialState, GameState, Actions } from "./game";
import EndModal from "./components/EndModal";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const gameEnd = state.game === GameState.END;

  React.useEffect(() => {
    dispatch({ type: Actions.INIT });
  }, []);

  return (
    <div className="container">
      <Header />
      <BoxGrid guesses={state.guesses} />
      <Keyboard dispatch={dispatch} keys={state.keys} />
      <EndModal isOpen={gameEnd} />
      <footer>Made with ❤️ by <a href="https://tejovanthn.com/now">Tj</a></footer>
    </div>
  );
}
