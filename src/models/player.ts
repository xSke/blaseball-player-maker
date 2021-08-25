import { Modification } from "./mod";
import { v4 } from "uuid";
import { getRandomName, getRandomRitual } from "../data/names";

const coffeeStyles = [
  "Black",
  "Light & Sweet",
  "Macchiato",
  "Cream & Sugar",
  "Cold Brew",
  "Flat White",
  "Americano",
  "Coffee?",
  "Heavy Foam",
  "Latte",
  "Decaf",
  "Milk Substitute",
  "Plenty of Sugar",
  "Anything",
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

function generateSoulscream(soul: number): string {
  const letters = "AEIOUXHAEI";

  let str = "";
  for (let s = 0; s < soul; s++) {
    let chunk = "";
    for (let c = 0; c < 5; c++) {
      chunk += letters[Math.floor(Math.random() * letters.length)];
    }

    str += chunk;
    str += chunk;
    str += chunk[0];
  }

  return str;
}

export interface Player {
  id: string;
  name: string;
  team: PlayerTeam;

  vibes: PlayerVibes;

  battingStars: PlayerStars;
  pitchingStars: PlayerStars;
  baserunningStars: PlayerStars;
  defenseStars: PlayerStars;

  evolutionGlow: boolean;
  evolution: string;

  peanutAllergy: string;
  ritual: string;
  coffee: string;
  blood: string;
  fate: string;
  soulscream: string;

  mods: Modification[];
}

export interface PlayerVibes {
  enabled: boolean;
  arrows: number;
  label: string;
}

export interface PlayerTeam {
  fullName: string;
  color: string;
  emoji: string;
}

export interface PlayerStars {
  base: number;
  item: number;
  evolution: number;
}

export function getBlankPlayer(): Player {
  const vibes = Math.floor(Math.random() * 7) - 3;
  const soul = Math.floor(Math.random() * 8) + 2;

  return {
    id: v4(),
    name: getRandomName(),
    team: {
      fullName: "Null Team",
      color: "#a8a8a8",
      emoji: "❓",
    },
    vibes: {
      enabled: true,
      arrows: vibes,
      label: vibeTexts[vibes],
    },
    battingStars: {
      base: parseFloat((Math.random() * 3 + 1).toFixed(1)),
      evolution: 0,
      item: parseFloat((Math.random() * 2 - 1).toFixed(1)),
    },
    pitchingStars: {
      base: parseFloat((Math.random() * 3 + 1).toFixed(1)),
      evolution: 0,
      item: parseFloat((Math.random() * 2 - 1).toFixed(1)),
    },
    baserunningStars: {
      base: parseFloat((Math.random() * 3 + 1).toFixed(1)),
      evolution: 0,
      item: parseFloat((Math.random() * 2 - 1).toFixed(1)),
    },
    defenseStars: {
      base: parseFloat((Math.random() * 3 + 1).toFixed(1)),
      evolution: 0,
      item: parseFloat((Math.random() * 2 - 1).toFixed(1)),
    },
    evolutionGlow: false,
    evolution: "Base",
    peanutAllergy: Math.random() < 0.5 ? "Yes" : "No",
    ritual: getRandomRitual(),
    coffee: coffeeStyles[Math.floor(Math.random() * coffeeStyles.length)],
    blood: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
    fate: Math.floor(Math.random() * 100).toString(),
    soulscream: generateSoulscream(soul),
    mods: [],
  };
}

export function encodePlayer(player: Player): string {
  const encoded = Buffer.from(JSON.stringify(player), "utf-8").toString(
    "base64"
  );
  return encoded.replace(/\//g, "_").replace(/\+/g, "-");
}

export function decodePlayer(data: string): Player {
  const buf = Buffer.from(data.replace(/_/g, "/").replace(/-/g, "+"), "base64");
  const json = buf.toString("utf-8");
  return JSON.parse(json);
}
