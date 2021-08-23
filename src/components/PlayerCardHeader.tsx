import { Player } from "../models/player";
import { Team } from "../models/team";

export default function PlayerCardHeader(props: {
  player: Player;
  teamOverride?: Team;
}) {
  const teamData = props.teamOverride
    ? {
        fullName: props.teamOverride.fullName,
        emoji: props.teamOverride.emoji,
        color: props.teamOverride.color,
      }
    : props.player.team;

  return (
    <div className="ModalItem-Info">
      <div className="Player-Header">
        <h2 className="ModalItem-Name">{props.player.name}</h2>
        <div className="Player-Header-Bottom">
          <div className="Player-Teams-Section">
            <div className="Player-Team-Line">
              <div
                className="Player-Team-Logo"
                style={{
                  background: `${teamData.color} none repeat scroll 0% 0%`,
                }}
              >
                <div className="Player-Team-Emoji">{teamData.emoji}</div>
              </div>
              <div className="Player-Team-Name">{teamData.fullName}</div>
            </div>
          </div>
          <div role="group" className="ModalItem-Button btn-group"></div>
        </div>
      </div>
    </div>
  );
}
