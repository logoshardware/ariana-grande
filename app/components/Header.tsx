'use client';

import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  background: rgba(255,192,203,0.95);
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 100;
`;

const Logo = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #c2185b;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  text-transform: uppercase;
  color: #222;
  cursor: pointer;
  position: relative;

  &:hover {
    color: #e91e63;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background: gold;
      bottom: -4px;
      left: 0;
      border-radius: 2px;
    }
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo>Ariana Grande</Logo>
      <Nav>
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#albums">Albums</NavLink>
        <NavLink href="#tour">Tour</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </Nav>
    </HeaderWrapper>
  );
}
