import { useState } from "react";
import "./App.css";
import { Category } from "./Category";
import { Level } from "./Level";
import { compareShallow } from "./util";

import Modal from "react-modal";
import { Group } from "./Group";

import { KanjiLevels, KanaLevels, VocabLevels } from "./StaticData";
import GroupSelector from "./GroupSelector";

const modalStyle = {
  content: {
    right: "auto",
    margin: "auto",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%)",
  },
};

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
      <span className="p-2 pr-0 pl-8 self-center">JLPT </span>
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
        ariaHideApp={false}
      >
        <div className="mx-4 w-[48rem]">
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
            <GroupSelector
              category={Category.Kana}
              levels={KanaLevels}
              groups={groups}
              setGroups={setGroups}
            />
          )}
          {chooseCategory === Category.Kanji && (
            <GroupSelector
              category={Category.Kanji}
              levels={KanjiLevels}
              groups={groups}
              setGroups={setGroups}
            />
          )}
          {chooseCategory === Category.Vocab && (
            <GroupSelector
              category={Category.Vocab}
              levels={VocabLevels}
              groups={groups}
              setGroups={setGroups}
            />
          )}
        </div>
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
