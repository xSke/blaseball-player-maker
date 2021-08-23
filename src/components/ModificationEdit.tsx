import {
  Form,
  Col,
  Row,
  Button,
  InputGroup,
  CloseButton,
  FloatingLabel,
} from "react-bootstrap";
import { Modification, ModType } from "../models/mod";
import { FormEvent } from "react";

export default function ModificationEdit(props: {
  mod: Modification;
  onDelete: () => void;
  setMod: (newMod: Modification) => void;
}) {
  return (
    <>
      <Row className="gy-3 mb-3">
        <Form.Group as={Col} md={4}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            className="flex-md-grow-2"
            value={props.mod.name}
            onChange={(e) =>
              props.setMod({ ...props.mod, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} md={8}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            className="flex-md-grow-2"
            value={props.mod.description}
            onChange={(e) =>
              props.setMod({ ...props.mod, description: e.target.value })
            }
          />
        </Form.Group>
      </Row>
      <Row className="gy-3 align-items-end">
        <Form.Group as={Col} md={3}>
          <Form.Label>Icon</Form.Label>

          <Form.Control
            type="text"
            className="flex-md-grow-2"
            value={props.mod.icon}
            onChange={(e) =>
              props.setMod({ ...props.mod, icon: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label>Type</Form.Label>
          <Form.Select
            value={props.mod.type}
            onChange={(e: FormEvent<HTMLSelectElement>) =>
              props.setMod({
                ...props.mod,
                type: (e.target as HTMLSelectElement).value as ModType,
              })
            }
          >
            <option value="permanent">Permanent</option>
            <option value="season">Season</option>
            <option value="week">Week</option>
            <option value="game">Game</option>
            <option value="item">Item</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Label>Background</Form.Label>
          <Form.Control
            type="text"
            value={props.mod.background}
            onChange={(e) =>
              props.setMod({ ...props.mod, background: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Label>Foreground</Form.Label>
          <Form.Control
            type="text"
            value={props.mod.foreground}
            onChange={(e) =>
              props.setMod({ ...props.mod, foreground: e.target.value })
            }
          />
        </Form.Group>
      </Row>
    </>
  );
}
