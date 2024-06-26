"use client";

import styled from "styled-components";

import { QUERIES } from "@/constants/styles";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px;

  @media ${QUERIES.tabletAndSmaller} {
    padding: 24px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding: 16px;
  }
`;
