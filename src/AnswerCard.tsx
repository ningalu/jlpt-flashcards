import { CardData, kanji, kana } from "./CardData";

export interface AnswerCardProps {
  card: CardData;
  answered: boolean;
}

const AnswerCard = ({ card, answered }: AnswerCardProps) => {
  return (
    <div
      className={`w-96 h-96 mr-3 p-4 bg-white flex items-center justify-center border-gray-200 border-2`}
    >
      {!answered && <span className="text-8xl">{kanji(card)}</span>}
      {answered && (
        <div className="flex flex-col p-4 ml-4 mt-4 w-full h-full">
          {card.kanji !== undefined && (
            <span className="text-8xl mb-8">{card.kanji}</span>
          )}
          <div className="mb-4 flex flex-col">
            {card.onyomi !== undefined && (
              <span className="">Onyomi: {card.onyomi.replace(" ", ", ")}</span>
            )}
            {card.kunyomi !== undefined && (
              <span className="">
                Kunyomi: {card.kunyomi.replace(" ", ", ")}
              </span>
            )}
          </div>
          {card.kana !== undefined && (
            <span className="">Kana: {card.kana}</span>
          )}

          <span>English: {card.english}</span>
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
