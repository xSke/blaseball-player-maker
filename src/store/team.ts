import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Team } from "../models/team";

interface TeamState {
  team: Team;
}

const initialState: TeamState = {
  team: {
    fullName: "Kansas City Breath Mints",
    color: "rgb(23, 143, 85)",
    emoji: "🍬",
    slogan: "uhhh",
    tarot: "XIII",

    mods: [],
    ballpark: {
      name: "a",
      nickname: "aa",
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
  },
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
});

export default teamSlice.reducer;
