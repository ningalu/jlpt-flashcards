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
          <span className="text-8xl">{kanji(card)}</span>
        </div>
      )}
      {answered && (
        <div className={`flex flex-col text-xl`}>
          {card.kanji !== undefined && (
            <span className="text-7xl mb-8">{card.kanji}</span>
          )}
          {card.onyomi !== undefined && (
            <span className="mb-4">
              Onyomi: {card.onyomi.replace(" ", ", ")}
            </span>
          )}
          {card.kunyomi !== undefined && (
            <span className="mb-4">
              Kunyomi: {card.kunyomi.replace(" ", ", ")}
            </span>
          )}
          {card.kana !== undefined && (
            <span className="mb-4">Kana: {card.kana}</span>
          )}

          <span>English: {card.english}</span>
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
