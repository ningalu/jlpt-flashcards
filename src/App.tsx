import { useState } from "react";
import "./App.css";
import { Category } from "./Category";
import { Level } from "./Level";
import { compareShallow } from "./util";

import Modal from "react-modal";
import { Group } from "./Group";

import { KanjiLevels, KanaLevels, VocabLevels, Levels } from "./StaticData";
import GroupSelector from "./GroupSelector";
import { CardData } from "./CardData";
import Flashcards from "./Flashcards";

const modalStyle = {
  content: {
    right: "auto",
    margin: "auto",
    // position: "absolute",
    left: "50%",
    transform: "translate(-50%)",
  },
};

function App() {
  // this should be a Set but idk how to make it do value comparisons and not reference comparisons
  const [groups, setGroups] = useState<Array<Group>>([
    { category: Category.Kana, level: Level.Hiragana, number: 0 },
  ]);
  const [currentList, setCurrentList] = useState<Array<CardData>>(
    Levels.get(Category.Kana)!.get(Level.Hiragana)![0]
  );
  const [complete, setComplete] = useState<Array<CardData>>([]);
  const [incorrect, setIncorrect] = useState(0);
  const [remaining, setRemaining] = useState<Array<CardData>>(
    Levels.get(Category.Kana)!.get(Level.Hiragana)![0]
  );

  const [cardSelect, setCardSelect] = useState(false);
  const [chooseCategory, setChooseCategory] = useState(Category.Kana);
  return (
    <div className="h-screen bg-gray-100">
      <div className="w-full bg-white border-b-2 h-14 flex justify-between">
        <div className="flex">
          <span className="p-2 pr-0 pl-8 self-center">JLPT </span>
          <button
            onClick={() => {
              setCardSelect(true);
            }}
            className="ml-4 p-2 bg-gray-200 border-gray-300 border-2 rounded-md inline self-center overflow-hidden"
          >
            Change Cards
          </button>
          <Modal
            isOpen={cardSelect}
            onRequestClose={() => {
              setCardSelect(false);
              let groupsContent: Array<CardData> = [];
              groups.forEach(({ category, level, number }) => {
                groupsContent = groupsContent.concat(
                  Levels.get(category)!.get(level)![number]
                );
              });
              setRemaining(
                groupsContent.length > 0
                  ? groupsContent
                  : Levels.get(Category.Kana)!.get(Level.Hiragana)![0]
              );
              setCurrentList(
                groupsContent.length > 0
                  ? groupsContent
                  : Levels.get(Category.Kana)!.get(Level.Hiragana)![0]
              );
              setIncorrect(0);
              setComplete([]);
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
        <div className="mr-8 flex">
          <span className="self-center w-32 mr-8">
            Remaining: {remaining.length}
          </span>
          <span className="self-center w-28 mr-8">Incorrect: {incorrect}</span>
          <span className="self-center w-28 mr-8">
            Complete: {complete.length}
          </span>
        </div>
      </div>
      <Flashcards
        full={currentList}
        remaining={remaining}
        setRemaining={setRemaining}
        complete={complete}
        setComplete={setComplete}
        incorrect={incorrect}
        setIncorrect={setIncorrect}
      />
    </div>
  );
}

let categoryButtons = [
  { name: "Kana", cat: Category.Kana },
  { name: "Kanji", cat: Category.Kanji },
  { name: "Vocab", cat: Category.Vocab },
];

export default App;
