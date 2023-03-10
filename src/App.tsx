import { useState } from "react";
import "./App.css";
import { Category } from "./Category";
import { Level } from "./Level";
import HiraganaJson from "./assets/Hiragana List.json";
import KatakanaJson from "./assets/Katakana List.json";
import { CardData } from "./CardData";
import Modal from "react-modal";

const HiraganaGroups = HiraganaJson as Array<Array<CardData>>;
const KatakanaGroups = KatakanaJson as Array<Array<CardData>>;

const KanaLevels = [
  { name: "Hiragana", content: HiraganaGroups },
  { name: "Katakana", content: KatakanaGroups },
];

const modalStyle = {
  content: {
    width: "66%",
    margin: "auto",
  },
};

function App() {
  const [level, setlevel] = useState(Level.Hiragana);
  const [category, setCategory] = useState(Category.Kana);
  const [groups, setGroups] = useState([0]);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [cardSelect, setCardSelect] = useState(false);
  const [chooseCategory, setChooseCategory] = useState(Category.Kana);

  return (
    <div className="w-full border-b-2 h-14 flex">
      <span className="p-2 pr-0 pl-8 self-center">
        JLPT {level} {groups.join(", ")}
      </span>
      <button
        onClick={() => {
          setCardSelect(true);
        }}
        className="ml-4 p-2 bg-gray-200 border-gray-300 border-2 rounded-md inline self-center"
      >
        Change Cards
      </button>
      <Modal
        isOpen={cardSelect}
        onRequestClose={() => setCardSelect(false)}
        style={modalStyle}
      >
        <h1 className="">Choose Category</h1>
        <div className="flex">
          {categoryButtons.map(({ name, cat }) => {
            return (
              <button
                className="p-2 mr-2 my-4 w-20 bg-gray-200 border-gray-300 border-2 rounded-md inline self-center"
                onClick={() => {
                  setGroups([]);
                  setChooseCategory(cat);
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
        {chooseCategory === Category.Kana && (
          <table className="table-fixed">
            <tr className="text-gray-400">
              <td className=" w-24">Group</td>
              {[...KanaLevels]
                .sort((a, b) => {
                  return a.content.length < b.content.length
                    ? 1
                    : a.content.length > b.content.length
                    ? -1
                    : 0;
                })[0]
                .content.map((_, i) => {
                  return <td className="w-12">{i + 1}</td>;
                })}
            </tr>
            {KanaLevels.map(({ name, content }) => {
              return (
                <tr>
                  <td>{name}</td>
                  {content.map((value, i) => (
                    <td>
                      <input type="checkbox" />
                    </td>
                  ))}
                </tr>
              );
            })}
          </table>
        )}
      </Modal>
    </div>
  );
}

let categoryButtons = [
  { name: "Kana", cat: Category.Kana },
  { name: "Kanji", cat: Category.Kanji },
  { name: "Vocab", cat: Category.Vocab },
];

export default App;
