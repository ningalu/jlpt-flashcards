import React from "react";
import { CardData } from "./CardData";
import { compareShallow } from "./util";

interface GuessCardsProps {
  options: Array<CardData | undefined>;
  answer?: CardData;
  guess?: CardData;
  setGuess(guess: CardData): void;
}

const GuessCards = ({ options, answer, guess, setGuess }: GuessCardsProps) => {
  return (
    <div className="grid grid-cols-3 lg:h-[30rem] lg:ml-3 ml-0.5">
      {options.map((n, i) => {
        return (
          <div key={i}>
            <span
              key={i}
              // there must be a better way to do this even without classnames lib
              className={`lg:w-[9rem] lg:h-[9rem] w-[3.5rem] h-[3.5rem] lg:p-2 p-1 lg:text-base lg:tracking-normal text-xs ${
                i % 3 === 2 ? "" : "lg:mr-6 mr-1"
              } ${i < 6 ? "lg:mb-6 mb-1" : ""} ${
                guess !== undefined && compareShallow(n ?? {}, answer!)
                  ? "bg-green-200 inner-border-green-300"
                  : guess === n
                  ? "bg-red-200 inner-border-red-300"
                  : "bg-white inner-border-gray-200"
              } lg:inner-border-4 inner-border-2 flex items-center align-middle text-center tracking-tighter justify-center overflow-y-clip `}
              onClick={() => {
                if (n != undefined) {
                  setGuess(n);
                }
              }}
            >
              {answer ? n?.english : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default GuessCards;
