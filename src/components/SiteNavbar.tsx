import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import Link from "next/link";

export default function SiteNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Insplect Element</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/player/edit" passHref>
              <Nav.Link>Edit Player</Nav.Link>
            </Link>

            <Link href="/team/edit" passHref>
              <Nav.Link>Edit Team</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
