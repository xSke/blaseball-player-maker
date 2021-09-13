import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as generate from "../models/generate";

function generateNames(): string[] {
  const names = [];
  for (let i = 0; i < 6; i++) {
    names.push(generate.name(false));
  }
  return names;
}

export default function NameGeneratorPage() {
  const [names, setNames] = useState<string[]>(() => generateNames());

  return (
    <Container>
      <Row className="justify-content-center mt-4 text-center">
        <Col lg={9} xl={6}>
          <h3>
            <Button
              variant="outline-secondary"
              onClick={() => setNames(generateNames())}
            >
              Reroll
            </Button>
          </h3>
          <h1 className="display-4">{names[0]}</h1>

          <div className="mt-4">
            <h5>or how about...</h5>
            <ul className="mt-3 list-unstyled">
              {names.slice(1).map((n) => (
                <li>
                  <em>{n}</em>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
