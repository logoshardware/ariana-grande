'use client';

import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #222;
  color: #f5f5f5;
  padding: 2rem 5vw;
  text-align: center;
`;

const SocialLinks = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  a {
    color: #f06292;
    font-size: 1.5rem;

    &:hover {
      color: gold;
    }
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <p>© {new Date().getFullYear()} Ariana Grande Fan Website</p>
      <SocialLinks>
        <a href="https://twitter.com/ArianaGrande" target="_blank" rel="noreferrer" aria-label="Twitter">🐦</a>
        <a href="https://instagram.com/arianagrande" target="_blank" rel="noreferrer" aria-label="Instagram">📸</a>
        <a href="https://youtube.com/arianagrande" target="_blank" rel="noreferrer" aria-label="YouTube">▶️</a>
      </SocialLinks>
    </FooterWrapper>
  );
}
