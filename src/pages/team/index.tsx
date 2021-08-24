import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import EditButton from "../../components/EditButton";
import PlayerCard from "../../components/PlayerCard";
import TeamCard from "../../components/TeamCard";
import { useUrlCode } from "../../hooks/urlcode";
import { getBlankTeam, Team } from "../../models/team";

export default function TeamViewPage() {
  const [team, setTeam] = useState<Team | null>(null);

  const payload = useUrlCode("https://insplect.netlify.app/team?data=");
  if (payload !== undefined && !team) {
    setTeam(JSON.parse(payload) || getBlankTeam());
  }

  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const selectedPlayer = team?.players[selectedPlayerId];

  return (
    <Container fluid className="gx-0 flex-grow-1 flex-column d-flex">
      {team ? (
        selectedPlayer ? (
          <div className="Card-Container d-flex flex-column">
            <h6 className="m-4 align-self-start">
              <Button
                variant="secondary"
                onClick={(e) => setSelectedPlayerId(null)}
              >
                ← Back to team
              </Button>
            </h6>

            <PlayerCard player={selectedPlayer} teamOverride={team} />
          </div>
        ) : (
          <div className="Card-Container d-flex flex-column">
            <div className="m-4 align-self-end">
              <EditButton pathname="/team/edit" />
            </div>

            <TeamCard
              team={team}
              onPlayerSelected={(id) => setSelectedPlayerId(id)}
            />
          </div>
        )
      ) : null}
    </Container>
  );
}
