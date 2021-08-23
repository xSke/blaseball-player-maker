import { Row, Col, Card, Form, Accordion, Button } from "react-bootstrap";
import { Modification } from "../models/mod";
import ModificationEdit from "./ModificationEdit";
import { fk, icons, attributes } from "../data/attributes";
import { useState } from "react";
import clsx from "clsx";
import { BsX } from "react-icons/bs";

export default function ModListEdit(props: {
  mods: Modification[];
  setMods: (newMods: Modification[]) => void;
}) {
  const knownMods = Object.keys(icons)
    .filter((i) => !fk.includes(i))
    .map((modId) => {
      const attr = attributes[modId];
      return { id: modId, name: attr.title };
    });
  knownMods.sort((a, b) => a.name.localeCompare(b.name));

  const [selectedMod, setSelectedMod] = useState<string | null>(null);

  return (
    <div>
      <Accordion flush className={clsx(props.mods.length && "border-bottom")}>
        {props.mods.map((m, i) => (
          <Accordion.Item key={`mod-${i}`} eventKey={i.toString()}>
            <Accordion.Header>
              <div className="d-flex flex-grow-1">
                <div className="flex-grow-1">
                  {m.name}
                  <span className="text-muted">&nbsp;- {m.icon}</span>
                </div>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    const newMods = [...props.mods];
                    newMods.splice(i, 1);
                    props.setMods(newMods);

                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="p-auto d-flex align-items-center"
                  style={{ margin: "-1rem 0" }}
                >
                  <BsX size="1.75rem" />
                </Button>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ModificationEdit
                mod={m}
                setMod={(newMod) => {
                  const newMods = [...props.mods];
                  newMods[i] = newMod;
                  props.setMods(newMods);
                }}
                onDelete={() => {
                  const newMods = [...props.mods];
                  newMods.splice(i, 1);
                  props.setMods(newMods);
                }}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <Card.Body>
        <Form className="mx-1">
          <Form.Group>
            <Row className="gx-3">
              <Form.Label column md="auto">
                Add new
              </Form.Label>

              <Col>
                <Form.Select
                  value={selectedMod || ""}
                  onChange={(e) =>
                    setSelectedMod((e.target as HTMLSelectElement).value)
                  }
                >
                  <option disabled value="">
                    Select a mod...
                  </option>
                  {knownMods.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md="auto">
                <Button
                  variant="primary"
                  onClick={(e) => {
                    const selected = attributes[selectedMod];
                    const newMod: Modification = {
                      name: selected.title,
                      description: selected.description,
                      type: "permanent",
                      foreground: selected.color,
                      background: selected.background,
                      icon: icons[selected.id],
                    };
                    props.setMods([...props.mods, newMod]);
                  }}
                  disabled={!selectedMod}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card.Body>
    </div>
  );
}
