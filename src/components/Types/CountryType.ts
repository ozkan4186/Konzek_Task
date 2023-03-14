export interface LanguageType {
  name: string;
  code: string;
}

export interface CountryType {
  name: string  ;
  code: string;
  native: string;
  capital: string;
  emoji: string;
  size: string  ;
  currency: string;
  languages: LanguageType[];
}

export interface valueType {
  currency: string;
  code: string;
  choice: string;
  language: string;
}