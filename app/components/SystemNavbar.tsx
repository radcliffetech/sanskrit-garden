import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function SystemNavbar() {
  return (
    <Navbar bg="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#" className="text-light">Sanskrit Garden</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-light">Home</Nav.Link>
            <Nav.Link href="/about" className="text-light">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}