import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Col,
  Row,
  Nav,
  Tab,
  Form,
  Button,
} from "react-bootstrap";
import PlayerCard from "../components/PlayerCard";
import TeamCard from "../components/TeamCard";
import { decodeTeam, encodeTeam, Team } from "../models/team";
import { TeamRosterEdit } from "../components/TeamRosterEdit";
import PlayerEdit from "../components/PlayerEdit";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useDebounce } from "use-debounce";
import SharePanel from "../components/SharePanel";

const defaultTeam: Team = {
  fullName: "Null Team",
  color: "#a8a8a8",
  emoji: "❓",
  slogan: "Null Slogan",
  tarot: "Null Tarot",

  mods: [],
  ballpark: {
    name: "",
    nickname: "",
    birds: "",
    balloons: "",
    floodBalloons: "",

    grandiosity: 0.5,
    fortification: 0.5,
    obtuseness: 0.5,
    ominousness: 0.5,
    inconvenience: 0.5,
    viscosity: 0.5,
    forwardness: 0.5,
    mysticism: 0.5,
    elongation: 0.5,
    filthiness: 0.5,
    luxuriousness: 0.5,
    hype: 0.5,
  },

  players: {},

  lineup: [],
  rotation: [],
  shadows: [],

  wins: "",
  record: "",
  runs: "",
  eDensity: "",
  tiebreaker: "",
  championships: 1,
  underchampionships: 0,
  evolved: "",
  netShame: "",
};

interface PageProps {
  team: Team | null;
}

export default function TeamPage(props: PageProps) {
  const [team, setTeam] = useState<Team>(() => props.team || defaultTeam);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const router = useRouter();
  const [debouncedTeam] = useDebounce(team, 500);
  useEffect(() => {
    router.replace(
      {
        pathname: "/team",
        query: {
          data: encodeTeam(debouncedTeam),
        },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  }, [debouncedTeam]);

  const selectedPlayer = selectedPlayerId
    ? team.players[selectedPlayerId]
    : null;

  return (
    <Container fluid className="gx-0">
      <Row className="gx-0 gy-3">
        <Col lg={6}>
          {selectedPlayer ? (
            <PlayerCard player={selectedPlayer} teamOverride={team} />
          ) : (
            <TeamCard team={team} />
          )}
        </Col>
        <Col lg={6} className="px-3">
          {selectedPlayer ? (
            <>
              <h6 className="mt-3">
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
              <Card>
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
                      <Row>
                        <Form.Group
                          as={Col}
                          xs={3}
                          sm={2}
                          lg={1}
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
                          xs={9}
                          sm={10}
                          lg={11}
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
                      </Row>

                      <Row>
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
                      <SharePanel data={encodeTeam(debouncedTeam)} />
                    </Card.Body>
                  </Tab.Pane>
                </Tab.Content>
              </Card>
            </Tab.Container>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<PageProps> {
  const query = context.query;

  let team = null;
  if (query["data"]) {
    team = decodeTeam(query["data"] as string);
  }
  return {
    props: { team },
  };
}
