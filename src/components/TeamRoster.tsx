import { Player } from "../models/player";
import { Team } from "../models/team";
import PlayerStars from "./PlayerStars";
import PlayerVibes from "./PlayerVibes";

function TeamPlayerLine(props: {
  player: Player;
  starType: "battingStars" | "pitchingStars";
}) {
  return (
    <a className="Team-Player-Line">
      <div className="Team-Player-Header">{props.player.name}</div>
      <div className="Team-Player-Vibe">
        <PlayerVibes
          arrows={props.player.vibes.arrows}
          enabled={props.player.vibes.enabled}
          label={null}
        />
      </div>
      <div className="Team-Player-Ratings">
        <PlayerStars stars={props.player[props.starType]} label={false} />
      </div>
    </a>
  );
}
export default function TeamRoster(props: { team: Team }) {
  return (
    <div className="ModalItem-Content ModalItem-Content-WithAttributes">
      {props.team.lineup.length ? (
        <div className="Team-Section">
          <div className="ModalItem-Subheader">Lineup</div>

          <ul>
            {props.team.lineup.map((p, i) => (
              <TeamPlayerLine
                key={i}
                player={props.team.players[p]}
                starType="battingStars"
              />
            ))}
          </ul>
        </div>
      ) : null}

      {props.team.rotation.length ? (
        <div className="Team-Section">
          <div className="ModalItem-Subheader">Rotation</div>

          <ul>
            {props.team.rotation.map((p, i) => (
              <TeamPlayerLine
                key={i}
                player={props.team.players[p]}
                starType="pitchingStars"
              />
            ))}
          </ul>
        </div>
      ) : null}

      {props.team.shadows.length ? (
        <div className="Team-Section">
          <div className="ModalItem-Subheader">Shadows</div>

          <ul>
            {props.team.shadows.map((p, i) => (
              <TeamPlayerLine
                key={i}
                player={props.team.players[p]}
                starType="battingStars"
              />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
