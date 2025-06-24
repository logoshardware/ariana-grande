'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 4rem 5vw;
  background: #fff0f5;
  color: #222;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  background: #c2185b;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.3s ease;

  &:hover {
    background: #e91e63;
  }
`;

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Here you would handle form submission (e.g., API call)
    setSubmitted(true);
  }

  if (submitted) return <Section><h3>Thanks for reaching out! I&#39;ll
    get back to you soon.</h3></Section>;

  return (
    <Section id="contact">
      <Title>Contact Me</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextArea
          name="message"
          placeholder="Your message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button type="submit">Send</Button>
      </Form>
    </Section>
  );
}
