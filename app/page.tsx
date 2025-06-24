'use client'; // ← MUST be at the very top

import Header from './components/Header';
import Hero from './components/Hero';
import AlbumCard from './components/AlbumCard';
import Tour from './components/Tour';
import Contact from './components/Contact';
import Footer from './components/Footer';
import styled from 'styled-components';

const AlbumsSection = styled.section`
  padding: 4rem 5vw;
  background: #fff0f5;
`;

const AlbumsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AlbumsSection id="albums">
        <h2 style={{ textAlign: 'center', color: '#c2185b', fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginBottom: '2rem' }}>
          Albums
        </h2>
        <AlbumsGrid>
          <AlbumCard title="Sweetener" image="/images/sweetener.jpg" />
          <AlbumCard title="Thank U, Next" image="/images/thank-you-next.jpg" />
          <AlbumCard title="Positions" image="/images/positions.jpg" />
          <AlbumCard title="Dangerous Woman"image="images/dangerous-woman.webp"/>
          <AlbumCard title="eternal Sunshine" image="/images/eternal-sunshine.jpg"/>
          
          {/* Add more albums as you want */}
        </AlbumsGrid>
      </AlbumsSection>
      <Tour />
      <Contact />
      <Footer />
    </>
  );
}
