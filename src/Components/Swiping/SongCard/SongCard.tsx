import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Song } from "../../../types/Song.d";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPause,
  faPlay,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import TextScroller from "../../TextScroller";
import Marquee from "react-fast-marquee";

type Props = {
  currentSong: Song;
  isOnTop: boolean;
};

type Titles = {
  isTitle?: boolean;
};

const Card = styled.div`
  background-color: #fff;
  padding: 50px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 60px 60px 0px rgb(0 4 51 / 9%);
  positioni: absolute;
  width: 350px;
  height: 500px;
`;

const Buttons = styled.div`
  padding: 2rem 0 0 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  text-align: center;
`;

const Info = styled.div``;

const Artwork = styled.img`
  border-radius: 16px;
  user-drag: none;
`;

const Title = styled.h1<Titles>`
  margin: 0 50px 0 0;
  text-align: center;
  font-size: ${(props) => (props.isTitle ? "xx-large" : "large")};
  font-weight: ${(props) => (props.isTitle ? "bold" : "normal")};
`;
export default function SongCard({ currentSong, isOnTop }: Props) {
  const [audio] = useState(new Audio(currentSong.preview_url));
  const [isPlaying, setIsPlaying] = useState(isOnTop);
  const [isPlayingMarquee, setIsPlayingMarquee] = useState(true);
  const delayLoop = () => {
    setIsPlayingMarquee(false);
    setTimeout(() => {
      setIsPlayingMarquee(true);
    }, 2000);
  };
  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
    return () => {
      audio.pause();
    };
  }, [isPlaying]);

  useEffect(() => {
    setIsPlaying(isOnTop);
  }, [isOnTop]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Card>
      <Info>
        <Artwork src={currentSong.album.images[1].url} />
        <Title isTitle>{currentSong.name}</Title>
        <Marquee
          pauseOnHover={true}
          onCycleComplete={delayLoop}
          play={isPlayingMarquee}
        >
          <Title>{currentSong.artists[0].name}</Title>
        </Marquee>
        <Title>{currentSong.album.name}</Title>
      </Info>
      <Buttons>
        <FontAwesomeIcon icon={faVolumeXmark} size={"3x"} />
        <FontAwesomeIcon
          onClick={togglePlay}
          icon={isPlaying ? faPause : faPlay}
          size={"3x"}
        />
        <FontAwesomeIcon icon={faHeart} size={"3x"} />
      </Buttons>
    </Card>
  );
}
