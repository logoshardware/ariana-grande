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
  { date: "Jun 22", city: "Chicago, IL" },
  { date: "Jun 25", city: "Toronto, ON" },
  { date: "Jun 27", city: "Boston, MA" },
  { date: "Jul 01", city: "Los Angeles, CA" },
  { date: "Jul 05", city: "New York, NY" },
  { date: "Jul 10", city: "London, UK" },
  { date: "Jul 15", city: "Paris, FR" },
  { date: "Jul 20", city: "Berlin, DE" },
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
