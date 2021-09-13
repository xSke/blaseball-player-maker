import React, { Dispatch, SetStateAction, useState } from "react";
import { Row, Col, Button, Tab, Card, Nav } from "react-bootstrap";
import { useDebounce } from "use-debounce";
import { encodeTeam, Team } from "../models/team";
import PlayerCard from "./PlayerCard";
import TeamCard from "./TeamCard";
import PlayerEdit from "./PlayerEdit";
import SharePanel from "./SharePanel";
import TeamRosterEdit from "./TeamRosterEdit";
import TeamInfoEdit from "./TeamInfoEdit";
import ModListEdit from "./ModListEdit";

export default function TeamEdit(props: {
  team: Team;
  setTeam: Dispatch<SetStateAction<Team>>;
}) {
  const { team, setTeam } = props;

  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const selectedPlayer = selectedPlayerId
    ? team.players[selectedPlayerId]
    : null;

  const [debouncedTeam] = useDebounce(team, 500);

  return (
    <Row className="gx-0 gy-3 flex-grow-1">
      <Col lg={6}>
        <div className="Card-Container Card-Container-Padded">
          {selectedPlayer ? (
            <PlayerCard player={selectedPlayer} teamOverride={team} />
          ) : (
            <TeamCard
              team={team}
              onPlayerSelected={(id) => setSelectedPlayerId(id)}
            />
          )}
        </div>
      </Col>
      <Col lg={6} className="px-3">
        {selectedPlayer ? (
          <>
            <h6 className="mb-3">
              <Button
                variant="outline-secondary"
                onClick={(e) => setSelectedPlayerId(null)}
              >
                ← Back to team
              </Button>
            </h6>
            <PlayerEdit
              player={selectedPlayer}
              teamOverride={team}
              setPlayer={(newPlayer) => {
                setTeam((t) => ({
                  ...t,
                  players: { ...t.players, [selectedPlayerId]: newPlayer },
                }));
              }}
            />
          </>
        ) : (
          <Tab.Container defaultActiveKey="team">
            <Card className="mb-3">
              <Card.Header>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="team">Team</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="roster">Roster</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="ballpark">Ballpark</Nav.Link>
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
                <Tab.Pane eventKey="team">
                  <TeamInfoEdit team={team} setTeam={setTeam} />
                </Tab.Pane>
                <Tab.Pane eventKey="roster">
                  <TeamRosterEdit
                    team={team}
                    setTeam={setTeam}
                    onPlayerEdit={(id) => setSelectedPlayerId(id)}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="ballpark">
                  <Card.Body>todo</Card.Body>
                </Tab.Pane>
                <Tab.Pane eventKey="mods">
                  <ModListEdit
                    mods={team.mods}
                    setMods={(m) => setTeam({ ...team, mods: m })}
                  />
                </Tab.Pane>

                <Tab.Pane eventKey="export">
                  <Card.Body>
                    <SharePanel
                      pathPrefix="/team?code="
                      tinyPrefix="/team?data="
                      data={encodeTeam(debouncedTeam)}
                    />
                  </Card.Body>
                </Tab.Pane>
              </Tab.Content>
            </Card>
          </Tab.Container>
        )}
      </Col>
    </Row>
  );
}
