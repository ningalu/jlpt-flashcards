import HiraganaJson from "./assets/json/Hiragana List.json";
import KatakanaJson from "./assets/json/Katakana List.json";
import KanjiN1Json from "./assets/json/KanjiList_N1_Formatted.json";
import KanjiN2Json from "./assets/json/KanjiList_N2_Formatted.json";
import KanjiN3Json from "./assets/json/KanjiList_N3_Formatted.json";
import KanjiN4Json from "./assets/json/KanjiList_N4_Formatted.json";
import KanjiN5Json from "./assets/json/KanjiList_N5_Formatted.json";
import { evenPartition } from "./util";
import { CardData } from "./CardData";
import { Level } from "./Level";

const HiraganaGroups = HiraganaJson as Array<Array<CardData>>;
const KatakanaGroups = KatakanaJson as Array<Array<CardData>>;

export const KanjiLevels = [
  {
    level: Level.N1,
    content: evenPartition(
      KanjiN1Json as Array<CardData>,
      KanjiN1Json.length / 40
    ),
  },
  {
    level: Level.N2,
    content: evenPartition(
      KanjiN2Json as Array<CardData>,
      KanjiN2Json.length / 40
    ),
  },
  {
    level: Level.N3,
    content: evenPartition(
      KanjiN3Json as Array<CardData>,
      KanjiN3Json.length / 40
    ),
  },
  {
    level: Level.N4,
    content: evenPartition(
      KanjiN4Json as Array<CardData>,
      KanjiN4Json.length / 40
    ),
  },
  {
    level: Level.N5,
    content: evenPartition(
      KanjiN5Json as Array<CardData>,
      KanjiN5Json.length / 40
    ),
  },
];

export const KanaLevels = [
  { level: Level.Hiragana, content: HiraganaGroups },
  { level: Level.Katakana, content: KatakanaGroups },
];
