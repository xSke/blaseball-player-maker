import { Modification } from "./mod";
import { v4 } from "uuid";
import * as generate from "./generate";

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
  const { soul, soulscream } = generate.soulAndScream();

  return {
    id: v4(),
    name: generate.name(),
    team: {
      fullName: "Null Team",
      color: "#a8a8a8",
      emoji: "❓",
    },
    vibes: generate.vibes(),
    battingStars: generate.stars(),
    pitchingStars: generate.stars(),
    baserunningStars: generate.stars(),
    defenseStars: generate.stars(),
    evolutionGlow: false,
    evolution: "Base",
    peanutAllergy: generate.allergy(),
    ritual: generate.ritual(),
    coffee: generate.coffee(),
    blood: generate.blood(),
    fate: generate.fate(),
    soulscream: soulscream,
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
