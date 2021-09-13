import React, { Dispatch, SetStateAction } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { Player } from "../models/player";
import { Team } from "../models/team";
import { BsArrowClockwise } from "react-icons/bs";
import * as generate from "../models/generate";

export default function PlayerContentEdit(props: {
  player: Player;
  teamOverride?: Team;
  setPlayer: Dispatch<SetStateAction<Player>>;
}) {
  const player = props.player;
  const setPlayer = props.setPlayer;

  const teamData = props.teamOverride
    ? {
        fullName: props.teamOverride.fullName,
        emoji: props.teamOverride.emoji,
        color: props.teamOverride.color,
      }
    : props.player.team;

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            value={player.name}
            onChange={(e) =>
              setPlayer({ ...props.player, name: e.target.value })
            }
          />
          <Button
            variant="outline-secondary"
            onClick={() => {
              setPlayer((p) => ({ ...p, name: generate.name() }));
            }}
            aria-label="Reroll name"
          >
            <BsArrowClockwise />
          </Button>
        </InputGroup>
      </Form.Group>

      <Row className="gx-2">
        <Form.Group as={Col} xs={7} md={9} className="mb-3">
          <Form.Label>Team</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={teamData.fullName}
              disabled={!!props.teamOverride}
              onChange={(e) =>
                setPlayer({
                  ...props.player,
                  team: { ...props.player.team, fullName: e.target.value },
                })
              }
            />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} xs={2} md={1} className="mb-3">
          <Form.Label>Emoji</Form.Label>
          <Form.Control
            type="text"
            value={teamData.emoji}
            disabled={!!props.teamOverride}
            onChange={(e) =>
              setPlayer({
                ...props.player,
                team: { ...props.player.team, emoji: e.target.value },
              })
            }
          />
        </Form.Group>

        <Form.Group as={Col} xs={3} md={2} className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            value={teamData.color}
            pattern="#?[0-9a-fA-F]{6}"
            disabled={!!props.teamOverride}
            onChange={(e) =>
              setPlayer({
                ...props.player,
                team: { ...props.player.team, color: e.target.value },
              })
            }
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Vibes</Form.Label>
        <InputGroup>
          <InputGroup.Checkbox
            aria-label="Vibes displayed?"
            checked={player.vibes.enabled}
            onChange={(e) =>
              setPlayer({
                ...props.player,
                vibes: { ...props.player.vibes, enabled: e.target.checked },
              })
            }
          />
          <Form.Control
            type="number"
            value={player.vibes.arrows}
            min={-10}
            max={10}
            className="flex-grow-0 w-25"
            step={1}
            onChange={(e) =>
              setPlayer({
                ...props.player,
                vibes: {
                  ...props.player.vibes,
                  arrows: parseInt(e.target.value),
                },
              })
            }
          />
          <Form.Control
            type="text"
            value={player.vibes.label}
            onChange={(e) =>
              setPlayer({
                ...props.player,
                vibes: { ...props.player.vibes, label: e.target.value },
              })
            }
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Evolution</Form.Label>
        <InputGroup>
          <InputGroup.Checkbox
            aria-label="Evolution glow?"
            checked={player.evolutionGlow}
            onChange={(e) =>
              setPlayer({
                ...props.player,
                evolutionGlow: e.target.checked,
              })
            }
          />
          <Form.Control
            type="text"
            value={player.evolution}
            onChange={(e) =>
              setPlayer({
                ...props.player,
                evolution: e.target.value,
              })
            }
          />
        </InputGroup>
      </Form.Group>

      <Row>
        <Form.Group as={Col} md={6} className="mb-3">
          <Form.Label>Peanut Allergy</Form.Label>
          <Form.Control
            type="text"
            value={player.peanutAllergy}
            onChange={(e) =>
              setPlayer({ ...props.player, peanutAllergy: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} md={6} className="mb-3">
          <Form.Label>Fate</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={player.fate}
              onChange={(e) =>
                setPlayer({ ...props.player, fate: e.target.value })
              }
            />
            <Button
              variant="outline-secondary"
              onClick={() => {
                setPlayer((p) => ({ ...p, fate: generate.fate() }));
              }}
              aria-label="Reroll fate"
            >
              <BsArrowClockwise />
            </Button>
          </InputGroup>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md={6} className="mb-3">
          <Form.Label>Blood Type</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={player.blood}
              onChange={(e) =>
                setPlayer({ ...props.player, blood: e.target.value })
              }
            />
            <Button
              variant="outline-secondary"
              onClick={() => {
                setPlayer((p) => ({ ...p, blood: generate.blood() }));
              }}
              aria-label="Reroll blood type"
            >
              <BsArrowClockwise />
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md={6} className="mb-3">
          <Form.Label>Coffee Style</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={player.coffee}
              onChange={(e) =>
                setPlayer({ ...props.player, coffee: e.target.value })
              }
            />
            <Button
              variant="outline-secondary"
              onClick={() => {
                setPlayer((p) => ({ ...p, coffee: generate.coffee() }));
              }}
              aria-label="Reroll coffee style"
            >
              <BsArrowClockwise />
            </Button>
          </InputGroup>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Pregame Ritual</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            value={player.ritual}
            onChange={(e) =>
              setPlayer({ ...props.player, ritual: e.target.value })
            }
          />
          <Button
            variant="outline-secondary"
            onClick={() => {
              setPlayer((p) => ({ ...p, ritual: generate.ritual() }));
            }}
            aria-label="Reroll ritual"
          >
            <BsArrowClockwise />
          </Button>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Soulscream</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            value={player.soulscream}
            onChange={(e) =>
              setPlayer({ ...props.player, soulscream: e.target.value })
            }
          />
          <Button
            variant="outline-secondary"
            onClick={() => {
              const { soul, soulscream } = generate.soulAndScream();
              setPlayer((p) => ({ ...p, soulscream }));
            }}
            aria-label="Reroll soulscream"
          >
            <BsArrowClockwise />
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}
