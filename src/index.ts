class StringuralClass {
  private string1: string;
  private string2: string;

  private firstCharacterUpperCase = (t: string) =>
    t.charAt(0).toUpperCase() + t.substr(1);

  private splitToAnyFromAnyFnc = (
    charToReplace: string | RegExp,
    newChar: string
  ) => {
    const re = new RegExp(charToReplace, "g");
    return this.string1.replace(re, newChar);
  };

  constructor(stringOne: string, stringTwo?: string) {
    this.string1 = stringOne;
    this.string2 = stringTwo;
  }

  isPreffixOf() {
    const minLen = Math.min(this.string1.length, this.string2.length);
    if (minLen === 0) {
      return false;
    }
    return (
      this.string1.substr(0, minLen) ===
      this.string2.substr(0, minLen)
    );
  }

  isSuffixOf() {
    const minLen = Math.min(this.string1.length, this.string2.length);
    if (minLen === 0) {
      return false;
    }
    return (
      this.string1.substr(this.string1.length - minLen) ===
      this.string2.substr(this.string2.length - minLen)
    );
  }

  // thisIsSomething -> this is something
  camelCaseToText(sep = " ") {
    this.string1 = this.string1.replace(
      /\p{Lu}/gu,
      (c) => `${sep}${c.toLowerCase()}`
    );
    return this;
  }

  firstCharUpperCase() {
    this.string1 = this.firstCharacterUpperCase(this.string1);
    return this;
  }

  firstCharLowerCase() {
    this.string1 = this.string1.charAt(0).toLowerCase() + this.string1.substr(1);
    return this;
  }

  // This is something -> thisIsSomething
  toCamelCase() {
    this.string1 = this.string1
      .toLowerCase()
      .split(/ +/)
      .map((word, i) => (i === 0 ? word : this.firstCharacterUpperCase(word)))
      .join("");
    return this;
  }

  // this_is_something -> this is something
  // this/is/something -> this is something
  splitToAnyFromAny = (charToReplace: string | RegExp, newChar: string) => {
    this.string1 = this.splitToAnyFromAnyFnc(charToReplace, newChar);
    return this
  };

  // This is something -> this-is-something
  toDashCase = () => {
    this.string1 = this.splitToAnyFromAnyFnc(/ /g, "-");
    return this;
  };

  // čřěř.. -> crer
  replaceDiacritics() {
    this.string1 = this.string1
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return this;
  }

  // settings/12415 -> settings
  getBeforeFirstSlash = () => {
    this.string1 = this.string1.substring(0, this.string1.indexOf("/"));
    return this;
  };

  // settings/12415 -> 12415
  getAfterLastSlash = () => {
    this.string1 = this.string1.substring(this.string1.lastIndexOf("/") + 1);
    return this;
  };

  // /domestic/market-segment <=> /international/market-segment
  replaceBothWay = () => {
    if (!this.string1.length) return this;
    if (this.string1.includes(this.string1)) {
      this.string1 = this.string1.replace(this.string1, this.string2);
    } else {
      this.string1 = this.string1.replace(this.string2, this.string1);
    }
    return this;
  };

  get stringOne() {
    return this.string1;
  }
}

const stringular = (stringOne: string, stringTwo?: string) => new StringuralClass(stringOne, stringTwo);

export default stringular;