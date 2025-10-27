'use client';

import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap';
import { usePathname, useRouter } from 'next/navigation';
import styles from './navbar.module.scss';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
      <Container>
        <BSNavbar.Brand
          onClick={() => router.push('/')}
          style={{
            cursor: 'pointer',
            fontSize: '1.25rem',
            transition: 'opacity 0.2s',
          }}
          className="fw-bold"
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <i className="bi bi-building me-2"></i>
          Apartment Listings
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => router.push('/')}
              active={isActive('/')}
              className={isActive('/') ? styles.active : ''}
              style={{
                padding: '0.5rem 1rem',
                transition: 'all 0.2s',
                borderRadius: '0.25rem',
                margin: '0 0.25rem',
              }}
            >
              <i className="bi bi-house-door me-2"></i>
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => router.push('/dashboard')}
              active={isActive('/dashboard')}
              className={isActive('/dashboard') ? styles.active : ''}
              style={{
                padding: '0.5rem 1rem',
                transition: 'all 0.2s',
                borderRadius: '0.25rem',
                margin: '0 0.25rem',
              }}
            >
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};
