import React, { useEffect, useLayoutEffect, useState } from "react";
import AnswerCard from "./AnswerCard";
import { CardData } from "./CardData";
import GuessCards from "./GuessCards";
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
  const [currentCard, setCurrentCard] = useState<CardData | undefined>({
    ...remaining[0],
  });

  useEffect(() => {
    setOptions(
      shuffle([0, ...shuffle(range(1, full.length)).slice(1, 9)]).map(
        (n) => full[n]
      )
    );
  }, [full]);

  useEffect(() => {
    const keydown = ({ key }: KeyboardEvent) => {
      if (key == " " || key == "Enter") {
        goNext();
      }
    };
    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, [result, options, remaining, complete, incorrect]);

  // treating the change of currentCard like an event skips reasoning about stale closures but adds reasoning about events
  useLayoutEffect(() => {
    shuffleOpts();
  }, [currentCard]);

  useLayoutEffect(() => {
    setCurrentCard(remaining[0]);
  }, [remaining]);

  // Starts a new guessing round after any guess
  // closures/capture values make this extremely awkward to reason about
  const goNext = () => {
    if (result === undefined) {
      return;
    }

    if (remaining.length < 1) {
      setCurrentCard(undefined);
      return;
    }

    if (result === currentCard) {
      setComplete([...complete, { ...currentCard }]);
      setRemaining(remaining.slice(1, remaining.length));
    } else {
      setIncorrect(incorrect + 1);
      setRemaining([...remaining.slice(1, remaining.length), remaining[0]]);
    }
    // currentCard and guessing options are updated with useLayoutEffect
    setResult(undefined);
  };

  const shuffleOpts = () => {
    if (currentCard === undefined) {
      // setOptions();
      return;
    }

    const allOpts = shuffle(range(0, full.length));
    let nextOpts = [];
    for (let i = 0; nextOpts.length < 8; i++) {
      if (!compareShallow(currentCard, full[allOpts[i]])) {
        nextOpts.push(allOpts[i]);
      }
    }
    setOptions(shuffle([currentCard, ...nextOpts.map((n) => full[n])]));
  };

  return (
    <div className="flex flex-col justify-center select-none">
      <div className="flex justify-center">
        <div className="lg:mt-48 mt-12 flex">
          <div>
            <AnswerCard card={currentCard} answered={result !== undefined} />
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
            <GuessCards
              options={options}
              answer={currentCard}
              guess={result}
              setGuess={setResult}
            />
            <div className="flex justify-start">
              <button
                className={`p-2 w-20 m-4 ml-3 border-2 rounded-md inline self-center ${
                  result !== undefined
                    ? "bg-white border-grey-200"
                    : "bg-gray-200 border-gray-300 text-gray-500 hover:cursor-not-allowed"
                }`}
                onClick={() => {
                  goNext();
                }}
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
