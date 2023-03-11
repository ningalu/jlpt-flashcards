import { useState } from "react";
import "./App.css";
import { Category } from "./Category";
import { Level } from "./Level";
import { compareShallow, evenPartition } from "./util";
import HiraganaJson from "./assets/json/Hiragana List.json";
import KatakanaJson from "./assets/json/Katakana List.json";
import KanjiN1Json from "./assets/json/KanjiList_N1_Formatted.json";
import KanjiN2Json from "./assets/json/KanjiList_N2_Formatted.json";
import KanjiN3Json from "./assets/json/KanjiList_N3_Formatted.json";
import KanjiN4Json from "./assets/json/KanjiList_N4_Formatted.json";
import KanjiN5Json from "./assets/json/KanjiList_N5_Formatted.json";
import { CardData } from "./CardData";
import Modal from "react-modal";
import { Group } from "./Group";

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

console.log(evenPartition([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));
console.log(evenPartition([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 2));
console.log(evenPartition([0, 1, 2], 3));
console.log(evenPartition([0, 1, 2], 4));

function App() {
  const [level, setlevel] = useState(Level.Hiragana);
  const [category, setCategory] = useState(Category.Kana);

  // this should be a Set but idk how to make it do value comparisons and not reference comparisons
  const [groups, setGroups] = useState<Array<Group>>([]);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [cardSelect, setCardSelect] = useState(false);
  const [chooseCategory, setChooseCategory] = useState(Category.Kana);

  return (
    <div className="w-full border-b-2 h-14 flex">
      <span className="p-2 pr-0 pl-8 self-center">
        JLPT{" "}
        {/* {groups
          .map(({ category, level, number }) => {
            return `${category} ${level} ${number}`;
          })
          .join(", ")} */}
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
        onRequestClose={() => {
          console.log(groups);
          setCardSelect(false);
        }}
        style={modalStyle}
      >
        <div className="flex">
          <h1 className="self-center mr-4 pb-1">Choose Category</h1>
          <button
            className="px-2 mr-2 my-4 w-20 bg-red-500 border-red-600 border-2 rounded-md inline self-center"
            onClick={() => {
              setGroups([]);
            }}
          >
            Clear All
          </button>
        </div>

        <div className="flex">
          {categoryButtons.map(({ name, cat }, i) => {
            return (
              <button
                key={i}
                className="p-2 mr-2 my-4 w-20 bg-gray-200 border-gray-300 border-2 rounded-md inline self-center"
                onClick={() => {
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
            <thead>
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
            </thead>
            <tbody>
              {KanaLevels.map(({ name, content }, i) => {
                return (
                  <tr key={i}>
                    <td>{name}</td>
                    {content.map((value, i) => (
                      <td key={i}>
                        <input
                          type="checkbox"
                          id={`${name} ${i}`}
                          checked={groups.reduce(
                            (acc, curr) =>
                              acc ||
                              compareShallow(curr, {
                                category: Category.Kana,
                                level: name as Level,
                                number: i + 1,
                              }),
                            false
                          )}
                          onChange={(event) => {
                            console.log(value, i);
                            let selected = {
                              category: Category.Kana,
                              level: name as Level,
                              number: i + 1,
                            };
                            event.target.checked
                              ? setGroups([...groups, selected])
                              : setGroups(
                                  [...groups].filter((v) => {
                                    return !compareShallow(v, selected);
                                  })
                                );
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
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
