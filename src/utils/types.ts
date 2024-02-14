export type Trad = {
  source: string;
  target: string;
};

export type TradParsed = string;
export type Translations = Array<Trad>;

export interface TranslationsFetch {
  translations: Array<Trad> | Array<TradParsed>;
  source: string;
  db: boolean;
}
