'use client';

import styled from 'styled-components';

const Card = styled.div`
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(240, 182, 189, 0.4);
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  background: white;

  &:hover {
    transform: scale(1.07);
    & > div.overlay {
      opacity: 1;
    }
  }
`;

const AlbumImage = styled.img`
  width: 100%;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 182, 193, 0.75);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
`;

const AlbumTitle = styled.h3`
  padding: 1rem 0;
  font-weight: 700;
  color: #c2185b;
  text-align: center;
`;

interface AlbumCardProps {
  title: string;
  image: string;
}

export default function AlbumCard({ title, image }: AlbumCardProps) {
  return (
    <Card>
      <AlbumImage src={image} alt={title} />
      <Overlay className="overlay">{/* optional icon */}</Overlay>
      <AlbumTitle>{title}</AlbumTitle>
    </Card>
  );
}
