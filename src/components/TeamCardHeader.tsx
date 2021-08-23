import { Team } from "../models/team";

export default function TeamCardHeader(props: { team: Team }) {
  return (
    <div className="ModalItem-Info">
      <div className="Team-Header">
        <div className="Team-LogoLine-Wrapper">
          <div className="Team-LogoLine">
            <div
              style={{ backgroundColor: props.team.color }}
              className="Team-Logo"
            >
              {props.team.emoji}
            </div>
          </div>
          <div className="ModalItem-Name-Wrapper">
            <h2 className="ModalItem-Name">{props.team.fullName}</h2>
            <div className="Team-Slogan">"{props.team.slogan}"</div>
          </div>
        </div>
        <div className="ModalItem-Name-Wrapper">
          <div className="Team-Card-Wrapper">
            <div className="Team-Card">{props.team.tarot}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
