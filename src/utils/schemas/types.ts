export type Trad = {
  source: string;
  target: string;
};

export type TradParsed = string;
export type Translations = Array<Trad>;

/**
 * Represents a fetch response for translations.
 */
export interface TranslationsFetch {
  /**
   * Array of translations.
   */
  translations: Array<Trad> | Array<TradParsed>;
  /**
   * The source word.
   */
  source: string;
  /**
   * Boolean indicating if translations are from the database.
   */
  db: boolean;
}
