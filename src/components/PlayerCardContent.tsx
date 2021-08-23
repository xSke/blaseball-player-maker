import React from "react";
import { Player } from "../models/player";
import PlayerStars from "./PlayerStars";
import PlayerVibes from "./PlayerVibes";

export default function PlayerCardContent(props: { player: Player }) {
  const p = props.player;
  return (
    <div className="ModalItem-Content ModalItem-Content-WithAttributes">
      <ul className="Player-Info-Stats">
        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Current Vibe</div>
          <PlayerVibes
            arrows={p.vibes.arrows}
            label={p.vibes.label}
            enabled={p.vibes.enabled}
          />
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Batting</div>
          <div className="Player-Info-Line-Body">
            <PlayerStars stars={p.battingStars} label={true} />
          </div>
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Pitching</div>
          <div className="Player-Info-Line-Body">
            <PlayerStars stars={p.pitchingStars} label={true} />
          </div>
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Baserunning</div>
          <div className="Player-Info-Line-Body">
            <PlayerStars stars={p.baserunningStars} label={true} />
          </div>
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Defense</div>
          <div className="Player-Info-Line-Body">
            <PlayerStars stars={p.defenseStars} label={true} />
          </div>
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Evolution</div>
          <div className="Player-Info-Line-Body">
            {p.evolutionGlow ? (
              <span className="Player-Gilded">{p.evolution}</span>
            ) : (
              p.evolution
            )}
          </div>
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Peanut Allergy</div>
          <div className="Player-Info-Line-Body">{p.peanutAllergy}</div>
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Pregame Ritual</div>
          <div className="Player-Info-Line-Body">{p.ritual}</div>
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Coffee Style</div>
          <div className="Player-Info-Line-Body">{p.coffee}</div>
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Blood Type</div>
          <div className="Player-Info-Line-Body">{p.blood}</div>
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Fate</div>
          <div className="Player-Info-Line-Body">{p.fate}</div>
        </li>

        <li className="Player-Info-Line">
          <div className="Player-Info-Line-Header">Soulscream</div>
          <div className="Player-Soulscream">
            <div className="Player-Soulscream-Body">{p.soulscream}</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
