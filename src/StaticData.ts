import HiraganaJson from "./assets/json/Hiragana List.json";
import KatakanaJson from "./assets/json/Katakana List.json";
import KanjiN1Json from "./assets/json/KanjiList_N1_Formatted.json";
import KanjiN2Json from "./assets/json/KanjiList_N2_Formatted.json";
import KanjiN3Json from "./assets/json/KanjiList_N3_Formatted.json";
import KanjiN4Json from "./assets/json/KanjiList_N4_Formatted.json";
import KanjiN5Json from "./assets/json/KanjiList_N5_Formatted.json";
import VocabN1Json from "./assets/json/VocabList_N1_Formatted.json";
import VocabN2Json from "./assets/json/VocabList_N2_Formatted.json";
import VocabN3Json from "./assets/json/VocabList_N3_Formatted.json";
import VocabN4Json from "./assets/json/VocabList_N4_Formatted.json";
import VocabN5Json from "./assets/json/VocabList_N5_Formatted.json";

import { evenPartition } from "./util";
import { CardData } from "./CardData";
import { Level } from "./Level";
import { Category } from "./Category";
import { KanjiData } from "./KanjiData";

const HiraganaGroups = HiraganaJson as Array<Array<CardData>>;
const KatakanaGroups = KatakanaJson as Array<Array<CardData>>;

export const VocabLevels = new Map([
  [
    Level.N1,
    evenPartition(
      VocabN1Json as Array<CardData>,
      Math.round(VocabN1Json.length / 60)
    ),
  ],
  [
    Level.N2,
    evenPartition(
      VocabN2Json as Array<CardData>,
      Math.round(VocabN2Json.length / 60)
    ),
  ],
  [
    Level.N3,
    evenPartition(
      VocabN3Json as Array<CardData>,
      Math.round(VocabN3Json.length / 60)
    ),
  ],
  [
    Level.N4,
    evenPartition(
      VocabN4Json as Array<CardData>,
      Math.round(VocabN4Json.length / 60)
    ),
  ],
  [
    Level.N5,
    evenPartition(
      VocabN5Json as Array<CardData>,
      Math.round(VocabN5Json.length / 60)
    ),
  ],
]);

export const KanjiLevels = new Map([
  [
    Level.N1,
    evenPartition(
      (KanjiN1Json as Array<KanjiData>),
      Math.round(KanjiN1Json.length / 60)
    ),
  ],
  [
    Level.N2,
    evenPartition(
      (KanjiN2Json as Array<KanjiData>),
      Math.round(KanjiN2Json.length / 40)
    ),
  ],
  [
    Level.N3,
    evenPartition(
      (KanjiN3Json as Array<KanjiData>),
      Math.round(KanjiN3Json.length / 40)
    ),
  ],
  [
    Level.N4,
    evenPartition(
      (KanjiN4Json as Array<KanjiData>),
      Math.round(KanjiN4Json.length / 30)
    ),
  ],
  [
    Level.N5,
    evenPartition(
      KanjiN5Json as Array<CardData>,
      Math.round(KanjiN5Json.length / 20)
    ),
  ],
]);

export const KanaLevels = new Map([
  [Level.Hiragana, HiraganaGroups],
  [Level.Katakana, KatakanaGroups],
]);

export const Levels: Map<Category, Map<Level, CardData[][]>> = new Map([
  [Category.Kana, KanaLevels],
  [Category.Kanji, KanjiLevels],
  [Category.Vocab, VocabLevels],
]);
