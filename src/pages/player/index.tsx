import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PlayerCard from "../../components/PlayerCard";
import { useUrlCode } from "../../hooks/urlcode";
import { getBlankPlayer, Player } from "../../models/player";
import EditButton from "../../components/EditButton";

export default function PlayerViewPage() {
  const [player, setPlayer] = useState<Player | null>(null);

  const payload = useUrlCode("https://insplect.netlify.app/player?data=");
  if (payload !== undefined && !player) {
    setPlayer(JSON.parse(payload) || getBlankPlayer());
  }

  return (
    <Container
      fluid
      className="gx-0 flex-grow-1 flex-column d-flex align-content-stretch position-relative"
    >
      <div className="Card-Container d-flex flex-column">
        <div className="m-4 align-self-end">
          <EditButton pathname="/player/edit" />
        </div>

        {player ? <PlayerCard player={player} /> : null}
      </div>
    </Container>
  );
}
