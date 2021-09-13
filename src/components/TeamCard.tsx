import { Team } from "../models/team";
import TeamCardHeader from "./TeamCardHeader";
import { Tab, Nav } from "react-bootstrap";
import TeamRoster from "./TeamRoster";
import React from "react";
import { Modification as ModModel } from "../models/mod";
import Modification from "./Modification";

function TeamMods(props: { mods: ModModel[] }) {
  if (!props.mods.length) return null;
  return (
    <div className="ModalItem-Attributes">
      <div className="AttributeBar">
        {props.mods.map((m, i) => (
          <Modification key={i} mod={m} />
        ))}
      </div>
    </div>
  );
}

export default function TeamCard(props: {
  team: Team;
  onPlayerSelected?: (id: string) => void;
}) {
  return (
    <div className="PlayerCard-Wrapper">
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
              <TeamMods mods={props.team.mods} />
              <TeamRoster
                onPlayerSelected={props.onPlayerSelected}
                team={props.team}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="info">
              <TeamMods mods={props.team.mods} />
              TODO
            </Tab.Pane>
            <Tab.Pane eventKey="ballpark">TODO</Tab.Pane>
            <Tab.Pane eventKey="feed">TODO</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}
