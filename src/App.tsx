import { useState } from "react";
import "./App.css";
import { Category } from "./Category";
import { Level } from "./Level";
import { compareShallow, shuffle } from "./util";

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
    { category: Category.Kanji, level: Level.N5, number: 0 },
  ]);
  const [currentList, setCurrentList] = useState<Array<CardData>>(
    Levels.get(Category.Kanji)!.get(Level.N5)![0]
  );
  const [complete, setComplete] = useState<Array<CardData>>([]);
  const [incorrect, setIncorrect] = useState(0);
  const [remaining, setRemaining] = useState<Array<CardData>>(
    Levels.get(Category.Kanji)!.get(Level.N5)![0]
  );
  const [randomise, setRandomise] = useState(true);

  const [cardSelect, setCardSelect] = useState(false);
  const [chooseCategory, setChooseCategory] = useState(Category.Kanji);
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

              groupsContent = randomise
                ? shuffle(groupsContent)
                : groupsContent;

              setRemaining(
                groupsContent.length > 0
                  ? groupsContent
                  : Levels.get(Category.Kanji)!.get(Level.N5)![0]
              );
              setCurrentList(
                groupsContent.length > 0
                  ? groupsContent
                  : Levels.get(Category.Kanji)!.get(Level.N5)![0]
              );
              setIncorrect(0);
              setComplete([]);
            }}
            style={modalStyle}
            ariaHideApp={false}
          >
            <div className="mx-4 w-[48rem]">
              <div className="flex flex-col">
                <div className="flex ">
                  <span className="self-center mr-4 pb-1">Choose Category</span>
                  <button
                    className="px-2 mr-2 my-2 w-20 bg-red-500 border-red-600 border-2 rounded-md inline self-center"
                    onClick={() => {
                      setGroups([]);
                    }}
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">Randomise Order</span>
                  <input
                    type="checkbox"
                    checked={randomise}
                    onChange={(e) => {
                      setRandomise(e.target.checked);
                    }}
                  />
                </div>
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
