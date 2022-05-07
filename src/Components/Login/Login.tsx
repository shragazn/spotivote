import React from "react";
import styled from "styled-components";

type Props = {};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Button = styled.a`
  background-color: #1db954;
  color: #ffffff;
  padding: 10px 30px;
  border-radius: 25px;
  font-size: large;
  text-decoration: none;
  transition: all 0.5s;
  &:hover {
    filter: brightness(1.2);
  }
`;
export default function Login({}: Props) {
  return (
    <Container>
      <Button href="/auth/login">Login With Spotify</Button>
    </Container>
  );
}
