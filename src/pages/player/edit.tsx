import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PlayerCard from "../../components/PlayerCard";
import PlayerEdit from "../../components/PlayerEdit";
import { useUrlCode } from "../../hooks/urlcode";
import { getBlankPlayer, Player } from "../../models/player";

export default function PlayerEditPage() {
  const [player, setPlayer] = useState<Player | null>(null);

  const payload = useUrlCode("https://insplect.netlify.app/player?data=");
  if (payload !== undefined && !player) {
    setPlayer(JSON.parse(payload) || getBlankPlayer());
  }

  return (
    <Container fluid className="gx-0 flex-grow-1 d-flex">
      {player ? (
        <Row className="gx-0 gy-3 flex-grow-1">
          <Col lg={6}>
            <div className="Card-Container Card-Container-Padded">
              <PlayerCard player={player} />
            </div>
          </Col>
          <Col lg={6} className="px-3">
            <PlayerEdit player={player} setPlayer={setPlayer} />
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}
