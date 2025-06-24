'use client';

import styled from 'styled-components';

const Section = styled.section`
  padding: 4rem 5vw;
  background: #ffe4ec;
  color: #6a0dad;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const List = styled.ul`
  max-width: 600px;
  margin: 0 auto;
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background: white;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  font-weight: 600;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
`;

const tours = [
  { date: 'July 15, 2025', city: 'New York, NY', venue: 'Madison Square Garden' },
  { date: 'July 22, 2025', city: 'Los Angeles, CA', venue: 'Staples Center' },
  { date: 'August 5, 2025', city: 'Chicago, IL', venue: 'United Center' },
  // Add more tour dates here
];

export default function Tour() {
  return (
    <Section id="tour">
      <Title>Tour Dates</Title>
      <List>
        {tours.map(({ date, city, venue }) => (
          <ListItem key={`${date}-${city}`}>
            <strong>{date}</strong> — {city} @ {venue}
          </ListItem>
        ))}
      </List>
    </Section>
  );
}
