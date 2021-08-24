import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { getBlankTeam, Team } from "../../models/team";
import TeamEdit from "../../components/TeamEdit";
import { useUrlCode } from "../../hooks/urlcode";

export default function TeamPage() {
  const [team, setTeam] = useState<Team | null>(null);

  const payload = useUrlCode("https://insplect.netlify.app/team?data=");
  if (payload !== undefined && !team) {
    setTeam(JSON.parse(payload) || getBlankTeam());
  }

  return (
    <Container fluid className="gx-0 flex-grow-1 d-flex">
      {team ? <TeamEdit team={team} setTeam={setTeam} /> : null}
    </Container>
  );
}
