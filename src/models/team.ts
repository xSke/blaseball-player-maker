import { Modification } from "./mod";
import { Player } from "./player";

export interface Team {
  fullName: string;
  color: string;
  emoji: string;
  slogan: string;
  tarot: string;

  mods: Modification[];
  ballpark: Ballpark;

  players: Partial<Record<string, Player>>;

  lineup: string[];
  rotation: string[];
  shadows: string[];

  wins: string;
  record: string;
  runs: string;
  eDensity: string;
  tiebreaker: string;
  championships: number;
  underchampionships: number;
  evolved: string;
  netShame: string;

  notes: string;
}

export interface Ballpark {
  name: string;
  nickname: string;
  birds: string;
  balloons: string;
  floodBalloons: string;

  grandiosity: number;
  fortification: number;
  obtuseness: number;
  ominousness: number;
  inconvenience: number;
  viscosity: number;
  forwardness: number;
  mysticism: number;
  elongation: number;
  filthiness: number;
  luxuriousness: number;
  hype: number;
}

export function encodeTeam(team: Team): string {
  const encoded = Buffer.from(JSON.stringify(team), "utf-8").toString("base64");
  return encoded.replace(/\//g, "_").replace(/\+/g, "-");
}

export function decodeTeam(data: string): string {
  const buf = Buffer.from(data.replace(/_/g, "/").replace(/-/g, "+"), "base64");
  const json = buf.toString("utf-8");
  return JSON.parse(json);
}

export function getBlankTeam(): Team {
  return {
    fullName: "Null Team",
    color: "#a8a8a8",
    emoji: "❓",
    slogan: "Null Slogan",
    tarot: "Null Tarot",

    mods: [],
    ballpark: {
      name: "",
      nickname: "",
      birds: "",
      balloons: "",
      floodBalloons: "",

      grandiosity: 0.5,
      fortification: 0.5,
      obtuseness: 0.5,
      ominousness: 0.5,
      inconvenience: 0.5,
      viscosity: 0.5,
      forwardness: 0.5,
      mysticism: 0.5,
      elongation: 0.5,
      filthiness: 0.5,
      luxuriousness: 0.5,
      hype: 0.5,
    },

    players: {},

    lineup: [],
    rotation: [],
    shadows: [],

    wins: "",
    record: "",
    runs: "",
    eDensity: "",
    tiebreaker: "",
    championships: 1,
    underchampionships: 0,
    evolved: "",
    netShame: "",

    notes: "",
  };
}
