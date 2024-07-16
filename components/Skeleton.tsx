import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const Skeleton = styled.div`
  animation: ${pulse} 1.5s infinite;
  background-color: #f0f0f0;
`;

export default Skeleton;
