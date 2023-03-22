import { CardData, kanji, kana } from "./CardData";

export interface AnswerCardProps {
  card: CardData;
  answered: boolean;
}

const AnswerCard = ({ card, answered }: AnswerCardProps) => {
  return (
    <div
      className={`w-[30rem] h-[30rem] mr-3 p-8 bg-white inner-border-4 inner-border-gray-200`}
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
