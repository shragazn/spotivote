import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tracklist from "../TrackList";
import User from "../User";

type Props = {
  token: string;
};

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function TopTracks({ token }: Props) {
  const [topTracks, setTopTracks] = useState();

  const getTracks = async () => {
    const query = { time_range: "short_term", limit: 20, offset: 0 };
    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${query.time_range}&limit=${query.limit}&offset=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    console.log(json.items);

    setTopTracks(json.items);
  };

  useEffect(() => {
    getTracks();
  }, []);
  return (
    <Top>
      <User token={token} />
      {topTracks && <Tracklist tracks={topTracks} />}
    </Top>
  );
}
