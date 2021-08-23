import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";

export default function SiteNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Player/Team Editor</Navbar.Brand>
        <Navbar.Toggle aria-controls="site-navbar" />
        <Navbar.Collapse id="site-navbar">
          <Nav className="me-auto">
            <Link href="/player" passHref>
              <Nav.Link>Player</Nav.Link>
            </Link>

            <Link href="/team" passHref>
              <Nav.Link>Team</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
