import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import SongCard from "./SongCard";

type Props = {
  token: string;
};

const Container = styled.div`
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Swiping({ token }: Props) {
  const [song, setSong] = useState();

  const id = "3JcFxUFb4ksMUaAM5LscUb";

  const getSong = async () => {
    const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    console.log(json);
    setSong(json);
  };

  useEffect(() => {
    getSong();
  }, []);

  return <Container>{song && <SongCard currentSong={song} />}</Container>;
}

//https://api.spotify.com/v1/tracks/3JcFxUFb4ksMUaAM5LscUb
//3JcFxUFb4ksMUaAM5LscUb
