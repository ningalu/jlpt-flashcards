import { CardData, kanji, kana } from "./CardData";

export interface AnswerCardProps {
  card: CardData;
  answered: boolean;
}

const AnswerCard = ({ card, answered }: AnswerCardProps) => {
  return (
    <div
      className={`lg:w-[30rem] lg:h-[30rem] w-[10rem] h-[11rem] lg:mr-3 mr-0.5 lg:p-8 bg-white lg:inner-border-4 inner-border-2 inner-border-gray-200`}
    >
      {!answered && (
        <div className="flex h-full items-center justify-center">
          <span className="lg:text-8xl text-6xl">{kanji(card)}</span>
        </div>
      )}
      {answered && (
        <div
          className={`flex flex-col lg:text-xl lg:tracking-normal text-sm tracking-tight p-2`}
        >
          {card.kanji !== undefined && (
            <span className="lg:text-7xl lg:mb-8 text-5xl mb-2">
              {card.kanji}
            </span>
          )}
          {card.onyomi !== undefined && (
            <span className="lg:mb-4 mb-2">
              Onyomi: {card.onyomi.replace(" ", ", ")}
            </span>
          )}
          {card.kunyomi !== undefined && (
            <span className="lg:mb-4 mb-2">
              Kunyomi: {card.kunyomi.replace(" ", ", ")}
            </span>
          )}
          {card.kana !== undefined && (
            <span className="lg:mb-4 mb-2">Kana: {card.kana}</span>
          )}

          <span>English: {card.english}</span>
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
