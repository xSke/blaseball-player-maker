import { Modification } from "./mod";
import { v4 } from "uuid";

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
  return {
    id: v4(),
    name: "New Player",
    team: {
      fullName: "Null Team",
      color: "#a8a8a8",
      emoji: "❓",
    },
    vibes: {
      enabled: true,
      arrows: 0,
      label: "Neutral",
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
    peanutAllergy: "No",
    ritual: "Unknown",
    coffee: "Black",
    blood: "A",
    fate: Math.floor(Math.random() * 100).toString(),
    soulscream: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
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
