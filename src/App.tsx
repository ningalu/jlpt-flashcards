import { useState } from "react";
import "./App.css";
import { Category } from "./Category";
import { Level } from "./Level";
import HiraganaJson from "./assets/Hiragana List.json";
import KatakanaJson from "./assets/Katakana List.json";
import { CardData } from "./CardData";

let HiraganaGroups = HiraganaJson as Array<Array<CardData>>;
let KatakanaGroups = KatakanaJson as Array<Array<CardData>>;

function App() {
  const [level, setlevel] = useState(Level.Hiragana);
  const [category, setCategory] = useState(Category.Kana);
  const [groups, setGroups] = useState([0]);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [remaining, setRemaining] = useState(0);

  return (
    <div className="w-full border-b-2 h-8">
      <div>
        <span className="p-2 pr-0 pl-8 align-middle">JLPT</span>
        <span className="p-2 pr-0 align-middle">{level}</span>
        <span className="p-2 pr-0 align-middle">{groups.join(", ")}</span>
        <span>{HiraganaGroups[0][0].kana}</span>
      </div>
    </div>
  );
}

export default App;
