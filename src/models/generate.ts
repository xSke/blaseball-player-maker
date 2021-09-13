import * as nameData from "../data/names";
import { PlayerStars, PlayerVibes } from "./player";

const coffeeStyles = [
  "Black",
  "Light & Sweet",
  "Macchiato",
  "Cream & Sugar",
  "Cold Brew",
  "Flat White",
  "Americano",
  "Espresso", // Coffee?
  "Heavy Foam",
  "Latte",
  "Decaf",
  "Milk Substitute",
  "Plenty of Sugar",
  "Anything", // (this one is technically not possible iirc? leaving it in anyway lol)
];

const bloodTypes = [
  "A",
  "AAA",
  "AA",
  "Acidic",
  "Basic",
  "O",
  "O No",
  "H₂O",
  "Electric",
  "Love",
  "Fire",
  "Psychic",
  "Grass",
];

const vibeTexts = {
  [-3]: "Honestly Terrible",
  [-2]: "Far Less Than Ideal",
  [-1]: "Less Than Ideal",
  [0]: "Neutral",
  [1]: "Quality",
  [2]: "Excellent",
  [3]: "Most Excellent",
};

export function blood(): string {
  return bloodTypes[Math.floor(Math.random() * bloodTypes.length)];
}

export function coffee(): string {
  return coffeeStyles[Math.floor(Math.random() * coffeeStyles.length)];
}

export function fate(): string {
  return Math.floor(Math.random() * 100).toString();
}

export function allergy(): string {
  return Math.random() < 0.5 ? "Yes" : "No";
}

export function soulAndScream(): { soul: number; soulscream: string } {
  const soul = Math.floor(Math.random() * 8) + 2;
  return { soul, soulscream: soulscream(soul) };
}

export function soulscream(soul: number): string {
  const letters = "AEIOUXHAEI";

  let str = "";
  for (let s = 0; s < soul; s++) {
    let chunk = "";
    for (let c = 0; c < 5; c++) {
      chunk += letters[Math.floor(Math.random() * letters.length)];
    }

    // 5-5-1 pattern
    str += chunk;
    str += chunk;
    str += chunk[0];
  }

  return str;
}

export function stars(): PlayerStars {
  return {
    base: parseFloat((Math.random() * 3 + 1).toFixed(1)),
    evolution: 0,
    item: parseFloat((Math.random() * 2 - 1).toFixed(1)),
  };
}

export function vibes(): PlayerVibes {
  const vibes = Math.floor(Math.random() * 7) - 3;

  return {
    enabled: true,
    arrows: vibes,
    label: vibeTexts[vibes],
  };
}

export function ritual(): string {
  return nameData.rituals[Math.floor(Math.random() * nameData.rituals.length)];
}

export function firstName(): string {
  return nameData.firstNames[
    Math.floor(Math.random() * nameData.firstNames.length)
  ];
}

export function lastName(): string {
  return nameData.lastNames[
    Math.floor(Math.random() * nameData.lastNames.length)
  ];
}

const specials = [
  "\u{1F9FF} standard emojis work as well", // standy <3
  "Gun Bong", // (do not lore)
];

export function name(rollSpecials = true): string {
  if (rollSpecials && Math.random() < 0.001) {
    return specials[Math.floor(Math.random() * specials.length)];
  }

  const first = firstName();
  const last = lastName();
  return `${first} ${last}`;
}
