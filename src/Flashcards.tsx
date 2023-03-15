import React, { useEffect, useState } from "react";
import { CardData } from "./CardData";
import { compareShallow, range, shuffle } from "./util";

// maybe it would have been easier to do this in the App.tsx level
export interface FlashCardsProps {
  full: Array<CardData>;
  remaining: Array<CardData>;
  setRemaining(remaining: Array<CardData>): void;
  complete: Array<CardData>;
  setComplete(remaining: Array<CardData>): void;
  incorrect: number;
  setIncorrect(incorrect: number): void;
}

const Flashcards = ({
  full,
  remaining,
  setRemaining,
  complete,
  setComplete,
  incorrect,
  setIncorrect,
}: FlashCardsProps) => {
  const [options, setOptions] = useState<Array<number>>([]);

  console.log("Options: ", options);
  console.log("Full: ", full);

  useEffect(() => {
    setOptions(shuffle([0, ...shuffle(range(1, full.length)).slice(1, 9)]));
  }, []);

  return (
    <div className="flex justify-center select-none">
      <div className="mt-48 flex">
        <span
          className={`${
            remaining.length > 1 ? "text-9xl" : "text-6xl"
          } w-96 h-96 mr-4 bg-white flex items-center justify-center border-gray-200 border-2`}
        >
          {remaining.length > 1 ? remaining[0].kana : "Complete!"}
        </span>
        <div className="grid grid-cols-3 ml-2">
          {options.map((n, i) => {
            return (
              <span
                key={i}
                className="w-28 h-28 mx-3 mb-6 bg-white border-gray-200 border-2 flex items-center justify-center"
                onClick={() => {
                  if (n === 0) {
                    if (remaining.length > 1) {
                      setComplete([...complete, remaining[0]]);
                      setRemaining(remaining.slice(1, remaining.length));
                      const allOpts = shuffle(range(0, full.length));
                      let nextOpts = [0];
                      for (let i = 0; nextOpts.length < 9; i++) {
                        if (!compareShallow(remaining[1], full[allOpts[i]])) {
                          nextOpts.push(allOpts[i]);
                        }
                      }
                      setOptions(shuffle(nextOpts));
                    }
                  } else {
                    if (remaining.length > 1) {
                      setIncorrect(incorrect + 1);
                      setRemaining([
                        ...remaining.slice(1, remaining.length),
                        remaining[0],
                      ]);
                      const allOpts = shuffle(range(0, full.length));
                      let nextOpts = [0];
                      for (let i = 0; nextOpts.length < 9; i++) {
                        if (!compareShallow(remaining[1], full[allOpts[i]])) {
                          nextOpts.push(allOpts[i]);
                        }
                      }
                      setOptions(shuffle(nextOpts));
                    }
                  }
                }}
              >
                {remaining.length > 1
                  ? n === 0
                    ? remaining[n].english
                    : full[n].english
                  : ""}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
