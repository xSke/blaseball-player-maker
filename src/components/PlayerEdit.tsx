import { Tab, Card, Nav, Form } from "react-bootstrap";
import { encodePlayer, Player, PlayerStars } from "../models/player";
import { Team } from "../models/team";
import PlayerStarsEdit from "./PlayerStarsEdit";
import ModListEdit from "./ModListEdit";
import PlayerContentEdit from "./PlayerContentEdit";
import React from "react";
import SharePanel from "./SharePanel";

function StarRow(props: {
  name: string;
  stars: PlayerStars;
  setStars: (s: PlayerStars) => void;
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.name}</Form.Label>
      <PlayerStarsEdit
        stars={props.stars}
        setStars={props.setStars}
        includeEvo={true}
      />
    </Form.Group>
  );
}

export default function PlayerEdit(props: {
  player: Player;
  teamOverride?: Team;
  setPlayer: (newPlayer: Player) => void;
}) {
  return (
    <Tab.Container defaultActiveKey="player">
      <Card>
        <Card.Header>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="player">Player</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="stars">Stars</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="mods">Mods</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="export">Export</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Tab.Content>
          <Tab.Pane eventKey="player">
            <Card.Body>
              <PlayerContentEdit
                player={props.player}
                teamOverride={props.teamOverride}
                setPlayer={props.setPlayer}
              />
            </Card.Body>
          </Tab.Pane>
          <Tab.Pane title="Stars" eventKey="stars">
            <Card.Body>
              <StarRow
                name="Batting"
                stars={props.player.battingStars}
                setStars={(s) =>
                  props.setPlayer({ ...props.player, battingStars: s })
                }
              />

              <StarRow
                name="Pitching"
                stars={props.player.pitchingStars}
                setStars={(s) =>
                  props.setPlayer({ ...props.player, pitchingStars: s })
                }
              />

              <StarRow
                name="Baserunning"
                stars={props.player.baserunningStars}
                setStars={(s) =>
                  props.setPlayer({ ...props.player, baserunningStars: s })
                }
              />

              <StarRow
                name="Defense"
                stars={props.player.defenseStars}
                setStars={(s) =>
                  props.setPlayer({ ...props.player, defenseStars: s })
                }
              />
            </Card.Body>
          </Tab.Pane>
          <Tab.Pane title="Mods" eventKey="mods">
            <ModListEdit
              mods={props.player.mods}
              setMods={(m) => props.setPlayer({ ...props.player, mods: m })}
            />
          </Tab.Pane>
          <Tab.Pane title="Export" eventKey="export">
            <Card.Body>
              <SharePanel
                pathPrefix="/player?code="
                tinyPrefix="/player?data="
                data={encodePlayer(props.player)}
              />
            </Card.Body>
          </Tab.Pane>
        </Tab.Content>
      </Card>
    </Tab.Container>
  );
}
