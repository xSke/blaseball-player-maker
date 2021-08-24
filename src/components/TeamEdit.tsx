import React, { Dispatch, SetStateAction, useState } from "react";
import { Row, Col, Button, Tab, Card, Form, Nav } from "react-bootstrap";
import { useDebounce } from "use-debounce";
import { encodeTeam, Team } from "../models/team";
import PlayerCard from "./PlayerCard";
import TeamCard from "./TeamCard";
import PlayerEdit from "./PlayerEdit";
import SharePanel from "./SharePanel";
import TeamRosterEdit from "./TeamRosterEdit";

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
                    <Nav.Link eventKey="export">Export</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Tab.Content>
                <Tab.Pane eventKey="team">
                  <Card.Body>
                    <Row className="gx-2">
                      <Form.Group
                        as={Col}
                        xs={2}
                        lg={2}
                        xl={1}
                        className="mb-3"
                      >
                        <Form.Label>Emoji</Form.Label>
                        <Form.Control
                          type="text"
                          value={team.emoji}
                          onChange={(e) =>
                            setTeam((t) => ({ ...t, emoji: e.target.value }))
                          }
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        xs={6}
                        lg={7}
                        xl={9}
                        className="mb-3"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={team.fullName}
                          onChange={(e) =>
                            setTeam((t) => ({
                              ...t,
                              fullName: e.target.value,
                            }))
                          }
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        xs={4}
                        lg={3}
                        xl={2}
                        className="mb-3"
                      >
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                          type="text"
                          value={team.color}
                          pattern="#?[0-9a-fA-F]{6}"
                          onChange={(e) =>
                            setTeam({
                              ...team,
                              color: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Row>

                    <Row className="gx-2">
                      <Form.Group as={Col}>
                        <Form.Label>Slogan</Form.Label>
                        <Form.Control
                          type="text"
                          value={team.slogan}
                          onChange={(e) =>
                            setTeam((t) => ({ ...t, slogan: e.target.value }))
                          }
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Tarot</Form.Label>
                        <Form.Control
                          type="text"
                          value={team.tarot}
                          onChange={(e) =>
                            setTeam((t) => ({ ...t, tarot: e.target.value }))
                          }
                        />
                      </Form.Group>
                    </Row>
                  </Card.Body>
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
