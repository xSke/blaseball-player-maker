import { Player } from "../models/player";
import PlayerCardContent from "./PlayerCardContent";
import PlayerCardHeader from "./PlayerCardHeader";
import Modification from "./Modification";
import { Team } from "../models/team";

export default function PlayerCard(props: {
  player: Player;
  teamOverride?: Team;
}) {
  return (
    <div className="PlayerCard-Wrapper min-vh-100">
      <div className="Modal Modal--Generic Modal--Static ModalItem theme-dark">
        <PlayerCardHeader
          player={props.player}
          teamOverride={props.teamOverride}
        />

        <div className="ModalTabs nav nav-tabs">
          <div className="nav-item">
            <a className="nav-link active">Info</a>
          </div>

          <div className="nav-item">
            <a className="nav-link">Items</a>
          </div>

          <div className="nav-item">
            <a className="nav-link">Feed</a>
          </div>
        </div>

        <div className="tab-content">
          <div className="fade tab-pane active show">
            {props.player.mods.length ? (
              <div className="ModalItem-Attributes">
                <div className="AttributeBar">
                  {props.player.mods.map((m, i) => (
                    <Modification key={i} mod={m} />
                  ))}
                </div>
              </div>
            ) : null}
            <PlayerCardContent player={props.player} />
          </div>
        </div>
      </div>
    </div>
  );
}
