import untypedDictionary from "../dictionary.json";

type Dictionary = Record<string, string>;

const dictionary: Dictionary = untypedDictionary as Dictionary;

const isInDictionary = (maybeWord: string) => {
  return Boolean(dictionary[maybeWord]);
};

export default isInDictionary;
