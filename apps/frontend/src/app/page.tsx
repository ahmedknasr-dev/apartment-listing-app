'use client';

import { Button, Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold text-primary">
            <i className="bi bi-house-door-fill me-2"></i>
            Apartment Listings
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">
                <i className="bi bi-house me-1"></i>
                Home
              </Nav.Link>
              <Nav.Link href="/apartments">
                <i className="bi bi-building me-1"></i>
                Apartments
              </Nav.Link>
              <Nav.Link href="/about">
                <i className="bi bi-info-circle me-1"></i>
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <div className="text-center my-5">
          <h1 className="display-4 fw-bold mb-3 text-primary">Welcome to Apartment Listings</h1>
          <p className="lead text-muted mb-4">
            A modern monorepo application built with NestJS backend and Next.js frontend
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button variant="primary" size="lg">
              <i className="bi bi-search me-2"></i>
              Browse Apartments
            </Button>
            <Button variant="secondary" size="lg">
              <i className="bi bi-info-circle me-2"></i>
              Learn More
            </Button>
          </div>
        </div>

        <Row className="my-5">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-primary">
              <Card.Body>
                <Card.Title className="text-primary">
                  <i className="bi bi-lightning-charge-fill me-2"></i>
                  Fast & Modern
                </Card.Title>
                <Card.Text>
                  Built with Next.js 16 and React 19 for optimal performance and developer experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="text-primary">
                  <i className="bi bi-gear-fill me-2"></i>
                  Monorepo Architecture
                </Card.Title>
                <Card.Text>
                  Organized with pnpm workspaces for efficient dependency management and code sharing.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-secondary">
              <Card.Body>
                <Card.Title className="text-secondary">
                  <i className="bi bi-stars me-2"></i>
                  Code Quality
                </Card.Title>
                <Card.Text>
                  Integrated with ESLint, Prettier, Husky, and CommitLint for consistent code quality.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="my-5 p-4 bg-light rounded shadow-sm">
          <h2 className="mb-3 text-primary">Technology Stack</h2>
          <Row>
            <Col md={6}>
              <h5>Backend</h5>
              <ul>
                <li>NestJS - Progressive Node.js framework</li>
                <li>TypeScript - Type-safe development</li>
                <li>Express - HTTP server</li>
              </ul>
            </Col>
            <Col md={6}>
              <h5>Frontend</h5>
              <ul>
                <li>Next.js 16 - React framework with App Router</li>
                <li>React Bootstrap - UI components</li>
                <li>TypeScript - Type-safe development</li>
              </ul>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
