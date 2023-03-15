export interface CardData {
    kanji?: string,
    kana?: string,
    onyomi?: string
    kunyomi?: string
    english: string
}

// https://github.com/microsoft/TypeScript/issues/45968 would make this a lot easier but lol
// i wonder what the overhead of creating classes is
export const kana = (c: CardData) => {
    return c.kana ?? c.kanji
}

export const kanji = (c: CardData) => {
    return c.kanji ?? c.kana
}