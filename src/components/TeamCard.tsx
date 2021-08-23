import { Player } from "../models/player";
import { Team } from "../models/team";
import TeamCardHeader from "./TeamCardHeader";
import { Tabs, Tab, Nav } from "react-bootstrap";
import TeamRoster from "./TeamRoster";

export default function TeamCard(props: {
  team: Team;
  onPlayerSelected?: (id: string) => void;
}) {
  return (
    <div className="PlayerCard-Wrapper min-vh-100">
      <div className="Modal Modal--Generic Modal--Static ModalItem theme-dark">
        <TeamCardHeader team={props.team} />

        <Tab.Container defaultActiveKey="roster">
          <Nav variant="tabs" className="ModalTabs">
            <Nav.Item>
              <Nav.Link eventKey="roster">Roster</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="info">Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ballpark">Ballpark</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="feed">Feed</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="roster">
              <TeamRoster team={props.team} />
            </Tab.Pane>
            <Tab.Pane eventKey="info">TODO</Tab.Pane>
            <Tab.Pane eventKey="ballpark">TODO</Tab.Pane>
            <Tab.Pane eventKey="feed">TODO</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}
