import React, { Dispatch, SetStateAction } from "react";
import { Card, Form, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { Team } from "../models/team";
import PlayerStarsEdit from "./PlayerStarsEdit";
import {
  FaEdit,
  FaAngleUp,
  FaAngleDown,
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaPen,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import { getBlankPlayer, Player } from "../models/player";

function TeamRosterSectionEdit(props: {
  name: string;
  team: Team;
  section: string[];
  starType: "battingStars" | "pitchingStars";
  setSection: (newSection: string[]) => void;
  setPlayer: (id: string, newPlayer: Player) => void;
  onPlayerEdit: (playerId: string) => void;
}) {
  return (
    <div className="mb-4">
      <Row className="align-items-center mb-1">
        <Col>
          <h5>{props.name}</h5>
        </Col>
        <Col md="auto">
          <Button
            size="sm"
            variant="outline-primary"
            onClick={(e) => {
              const players = [...props.section];

              const newPlayer = {
                ...getBlankPlayer(),
                team: {
                  fullName: props.team.fullName,
                  emoji: props.team.emoji,
                  color: props.team.color,
                },
              };
              players.push(newPlayer.id);

              props.setPlayer(newPlayer.id, newPlayer);
              props.setSection(players);
            }}
          >
            Add
          </Button>
        </Col>
      </Row>

      {props.section.map((playerId, i) => {
        const player = props.team.players[playerId];
        return (
          <Row key={playerId} className="mb-2 gx-3">
            <Col md="auto">
              <ButtonGroup>
                <Button
                  variant="outline"
                  className="px-1"
                  onClick={(e) => {
                    const players = [...props.section];
                    const [p] = players.splice(i, 1);
                    players.splice(Math.max(0, i - 1), 0, p);
                    props.setSection(players);
                  }}
                >
                  <FaArrowUp />
                </Button>
                <Button
                  variant="outline"
                  className="px-1"
                  onClick={(e) => {
                    const players = [...props.section];
                    const [p] = players.splice(i, 1);
                    players.splice(i + 1, 0, p);
                    props.setSection(players);
                  }}
                >
                  <FaArrowDown />
                </Button>
              </ButtonGroup>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  type="text"
                  value={player.name}
                  onChange={(e) => {
                    const newPlayer = {
                      ...player,
                      name: e.target.value,
                    };
                    props.setPlayer(playerId, newPlayer);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <PlayerStarsEdit
                stars={player[props.starType]}
                setStars={(newStars) => {
                  const newPlayer = {
                    ...player,
                    [props.starType]: newStars,
                  };
                  props.setPlayer(playerId, newPlayer);
                }}
              />
            </Col>
            <Col md="auto" className="d-flex">
              <ButtonGroup>
                <Button
                  variant="outline"
                  className="px-1"
                  onClick={(e) => {
                    props.onPlayerEdit(playerId);
                  }}
                >
                  <FaPen />
                </Button>

                <Button
                  variant="outline"
                  className="px-1"
                  onClick={(e) => {
                    const players = [...props.section];
                    players.splice(i, 1);
                    props.setSection(players);
                  }}
                >
                  <FaTimes />
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        );
      })}
    </div>
  );
}
// function PlayerEditRow(props: { player: Player })

export function TeamRosterEdit(props: {
  team: Team;
  setTeam: Dispatch<SetStateAction<Team>>;
  onPlayerEdit: (playerId: string) => void;
}) {
  return (
    <Card.Body>
      <TeamRosterSectionEdit
        name="Lineup"
        starType="battingStars"
        team={props.team}
        section={props.team.lineup}
        setPlayer={(id, newPlayer) => {
          props.setTeam((t) => ({
            ...t,
            players: { ...t.players, [id]: newPlayer },
          }));
        }}
        setSection={(newSection) =>
          props.setTeam((t) => ({ ...t, lineup: newSection }))
        }
        onPlayerEdit={props.onPlayerEdit}
      />

      <TeamRosterSectionEdit
        name="Rotation"
        starType="pitchingStars"
        team={props.team}
        section={props.team.rotation}
        setPlayer={(id, newPlayer) => {
          props.setTeam((t) => ({
            ...t,
            players: { ...t.players, [id]: newPlayer },
          }));
        }}
        setSection={(newSection) =>
          props.setTeam((t) => ({ ...t, rotation: newSection }))
        }
        onPlayerEdit={props.onPlayerEdit}
      />

      <TeamRosterSectionEdit
        name="Shadows"
        starType="battingStars"
        team={props.team}
        section={props.team.shadows}
        setPlayer={(id, newPlayer) => {
          props.setTeam((t) => ({
            ...t,
            players: { ...t.players, [id]: newPlayer },
          }));
        }}
        setSection={(newSection) =>
          props.setTeam((t) => ({ ...t, shadows: newSection }))
        }
        onPlayerEdit={props.onPlayerEdit}
      />
    </Card.Body>
  );
}
