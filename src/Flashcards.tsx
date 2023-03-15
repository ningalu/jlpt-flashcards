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
  const [options, setOptions] = useState<Array<CardData>>([]);
  const [result, setResult] = useState<CardData | undefined>(undefined);

  useEffect(() => {
    setOptions(
      shuffle([0, ...shuffle(range(1, full.length)).slice(1, 9)]).map(
        (n) => full[n]
      )
    );
    setResult(undefined);
  }, [full]);

  useEffect(() => {
    window.addEventListener("keydown", ({ key }) => {
      if (key == " " || key == "Enter") {
        goNext();
      }
    });
  }, [result, options, remaining, complete, incorrect]);

  const goNext = () => {
    if (result === undefined) {
      return;
    }

    shuffleOpts();

    if (result === remaining[0]) {
      if (remaining.length > 1) {
        setComplete([...complete, remaining[0]]);
        setRemaining(remaining.slice(1, remaining.length));
      }
    } else {
      if (remaining.length > 1) {
        setIncorrect(incorrect + 1);
        setRemaining([...remaining.slice(1, remaining.length), remaining[0]]);
      }
    }

    setResult(undefined);
  };

  const shuffleOpts = () => {
    const allOpts = shuffle(range(0, full.length));
    let nextOpts = [];
    for (let i = 0; nextOpts.length < 8; i++) {
      if (!compareShallow(remaining[1], full[allOpts[i]])) {
        nextOpts.push(allOpts[i]);
      }
    }
    setOptions(shuffle([remaining[1], ...nextOpts.map((n) => full[n])]));
  };

  return (
    <div className="flex flex-col justify-center select-none">
      <div className="flex justify-center">
        <div className="mt-48 flex">
          <div>
            <span
              className={`w-96 h-96 mr-3 transform bg-white flex items-center justify-center border-gray-200 border-2 ${
                remaining.length > 1 ? "text-9xl" : "text-6xl"
              }`}
            >
              {result !== undefined
                ? remaining[0].english
                : remaining.length <= 0
                ? "Complete!"
                : remaining[0].kanji === undefined
                ? remaining[0].kana
                : remaining[0].kanji}
            </span>
            <div className="flex justify-end">
              <button
                className={`p-2 w-20 m-4 mr-3 ${
                  result === undefined
                    ? "bg-white border-grey-200"
                    : "bg-gray-200 border-gray-300 text-gray-500 hover:cursor-not-allowed"
                } border-2 rounded-md inline self-center`}
                onClick={() => {
                  if (result === undefined) {
                    setRemaining([
                      ...remaining.slice(1, remaining.length),
                      remaining[0],
                    ]);
                    shuffleOpts();
                  }
                }}
              >
                Skip
              </button>
            </div>
          </div>
          <div className="">
            {/* width is like 4 tailwind units larger because of the borders */}
            <div className="grid grid-cols-3 h-96 ml-3">
              {options.map((n, i) => {
                return (
                  <span
                    key={i}
                    // there must be a better way to do this even without classnames lib
                    className={`w-28 h-28 ${i % 3 === 2 ? "" : "mr-5"} ${
                      i < 6 ? "mb-6" : ""
                    } ${
                      result !== undefined && compareShallow(n, remaining[0])
                        ? "bg-green-200 border-green-300"
                        : result === n
                        ? "bg-red-200 border-red-300"
                        : "bg-white border-gray-200"
                    } border-2 flex items-center align-middle text-center tracking-tighter justify-center`}
                    onClick={() => {
                      setResult(n);
                    }}
                  >
                    {remaining.length > 0 ? n.english : ""}
                  </span>
                );
              })}
            </div>
            <div className="flex justify-start">
              <button
                className={`p-2 w-20 m-4 ml-3 ${
                  result !== undefined
                    ? "bg-white border-grey-200"
                    : "bg-gray-200 border-gray-300 text-gray-500 hover:cursor-not-allowed"
                } border-2 rounded-md inline self-center`}
                onClick={goNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
};

export default Flashcards;
