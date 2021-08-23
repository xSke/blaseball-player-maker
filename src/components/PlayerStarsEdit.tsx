import React from "react";
import { PlayerStars } from "../models/player";
import { Form, InputGroup, Row, Col } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";

export default function PlayerStarsEdit(props: {
  stars: PlayerStars;
  setStars: (newStars: PlayerStars) => void;
}) {
  return (
    <Row className="gx-2">
      <Col sm={6}>
        <InputGroup>
          <InputGroup.Text>
            <BsStarFill />
          </InputGroup.Text>
          <Form.Control
            type="number"
            value={props.stars.base}
            min={0}
            step={0.1}
            onChange={(e) =>
              props.setStars({
                ...props.stars,
                base: parseFloat(e.target.value),
              })
            }
          />
        </InputGroup>
      </Col>
      <Col sm={6}>
        <InputGroup>
          <InputGroup.Text>
            <BsStar />
          </InputGroup.Text>
          <Form.Control
            type="number"
            value={props.stars.item}
            min={-props.stars.base}
            step={0.1}
            onChange={(e) =>
              props.setStars({
                ...props.stars,
                item: parseFloat(e.target.value),
              })
            }
          />
        </InputGroup>
      </Col>
      {/* <Col sm={4}>
        <InputGroup>
          <InputGroup.Text>Evo</InputGroup.Text>
          <Form.Control
            type="number"
            value={props.stars.evolution}
            min={0}
            step={1}
            onChange={(e) =>
              props.setStars({
                ...props.stars,
                evolution: parseFloat(e.target.value),
              })
            }
          />
        </InputGroup>
      </Col> */}
    </Row>
  );
}
