"use client";

import { DownloadCloud } from "react-feather";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <h1>Avator</h1>
      <Button>
        <DownloadCloud size={18} strokeWidth={3} /> Take snap
      </Button>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  flex-shrink: 0;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  border-radius: 10px;
  border-style: none;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  height: 100%;
  padding: 0 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-color: var(--primary-color-light);
  }
`;
