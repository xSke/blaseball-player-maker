import React from "react";
import { PlayerStars } from "../models/player";
import { Form, InputGroup, Row, Col } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";

export default function PlayerStarsEdit(props: {
  stars: PlayerStars;
  setStars: (newStars: PlayerStars) => void;
  includeEvo?: boolean;
}) {
  return (
    <Row className="gx-2">
      <Col>
        <InputGroup>
          <InputGroup.Text>
            <BsStarFill aria-label="Base stars" />
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
      <Col>
        <InputGroup>
          <InputGroup.Text>
            <BsStar aria-label="Item stars" />
          </InputGroup.Text>
          <Form.Control
            type="number"
            value={props.stars.item}
            min={-(props.stars.base || 0)}
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
      {props.includeEvo && (
        <Col>
          <InputGroup>
            <InputGroup.Text>
              <BsStarFill className="EvoStar" aria-label="Evolution stars" />
            </InputGroup.Text>
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
        </Col>
      )}
    </Row>
  );
}
