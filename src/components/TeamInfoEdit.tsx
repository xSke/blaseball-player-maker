import { Dispatch, SetStateAction } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { Team } from "../models/team";

export default function TeamInfoEdit(props: {
  team: Team;
  setTeam: Dispatch<SetStateAction<Team>>;
}) {
  const { team, setTeam } = props;
  return (
    <Card.Body>
      <Row className="gx-2">
        <Form.Group as={Col} xs={2} lg={2} xl={1} className="mb-3">
          <Form.Label>Emoji</Form.Label>
          <Form.Control
            type="text"
            value={team.emoji}
            onChange={(e) => setTeam((t) => ({ ...t, emoji: e.target.value }))}
          />
        </Form.Group>

        <Form.Group as={Col} xs={6} lg={7} xl={9} className="mb-3">
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

        <Form.Group as={Col} xs={4} lg={3} xl={2} className="mb-3">
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
            onChange={(e) => setTeam((t) => ({ ...t, slogan: e.target.value }))}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Tarot</Form.Label>
          <Form.Control
            type="text"
            value={team.tarot}
            onChange={(e) => setTeam((t) => ({ ...t, tarot: e.target.value }))}
          />
        </Form.Group>
      </Row>
    </Card.Body>
  );
}
