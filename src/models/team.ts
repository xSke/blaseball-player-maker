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

export function decodeTeam(data: String): string {
  const buf = Buffer.from(data.replace(/_/g, "/").replace(/-/g, "+"), "base64");
  const json = buf.toString("utf-8");
  return JSON.parse(json);
}
