import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PlayerCard from "../components/PlayerCard";
import PlayerEdit from "../components/PlayerEdit";
import {
  decodePlayer,
  encodePlayer,
  getBlankPlayer,
  Player,
} from "../models/player";
import { v4 } from "uuid";
import { useDebounce } from "use-debounce";

interface PageProps {
  player: Player | null;
}

function PlayerPage(props: PageProps) {
  const router = useRouter();

  const [player, setPlayer] = useState<Player>(
    () => props.player || getBlankPlayer()
  );
  const [debouncedPlayer] = useDebounce(player, 500);

  useEffect(() => {
    router.replace({
      pathname: "/player",
      query: {
        data: encodePlayer(debouncedPlayer),
      },
    });
  }, [debouncedPlayer]);

  return (
    <Container fluid className="gx-0 min-vh-100">
      <Row className="gx-0 gy-3">
        <Col lg={6}>
          <PlayerCard player={player} />
        </Col>
        <Col lg={6} className="px-3">
          <PlayerEdit player={player} setPlayer={setPlayer} />
        </Col>
      </Row>
    </Container>
  );
}

export default PlayerPage;

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<PageProps> {
  const query = context.query;

  let player = null;
  if (query["data"]) {
    player = decodePlayer(query["data"] as string);
  } else {
    player = getBlankPlayer();
  }
  return {
    props: { player },
  };
}
