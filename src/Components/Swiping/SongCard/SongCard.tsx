import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPause,
  faPlay,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDrag } from "react-use-gesture";
import { animated, useSpring, useTransition } from "react-spring";
type Props = {
  currentSong: any;
};

type Titles = {
  isTitle?: boolean;
};

type CardType = {
  pos: any;
};
const Card = styled.div<CardType>`
  background-color: #fff;
  padding: 50px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 60px 60px 0px rgb(0 4 51 / 9%);
  positioni: absolute;
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
  margin: 0;
  text-align: center;
  font-size: ${(props) => (props.isTitle ? "xx-large" : "large")};
  font-weight: ${(props) => (props.isTitle ? "bold" : "normal")};
`;

export default function SongCard({ currentSong }: Props) {
  const [audio] = useState(new Audio(currentSong.preview_url));
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState<boolean>();
  useEffect(() => {
    isPlaying ? audio.pause() : audio.pause();
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const [{ x, rot, y }, api] = useSpring(() => ({ x: 0, y: 1000, rot: 0 }));
  const bind = useDrag(
    ({ down, movement: [mx], active, direction: [xDir], velocity: vx }) => {
      api.start((i) => {
        const trigger = vx > 0.4;
        let x =
          !active && trigger ? window.innerWidth * xDir * vx : active ? mx : 0;
        const rot = x / 100;
        if (!active && trigger) setIsLiked(xDir > 0);
        return {
          rot,
          x,
          y: 1,
        };
      });
    }
  );

  const transitions = useTransition(0, {});

  useEffect(() => {
    console.log(isLiked);
  }, [isLiked]);
  return (
    <animated.div {...bind()} style={{ x, rotate: rot }}>
      <Card pos={{ x, rot }}>
        <Info>
          <Artwork src={currentSong.album.images[1].url} />
          <Title isTitle>{currentSong.name}</Title>
          <Title>{currentSong.artists[0].name}</Title>
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
    </animated.div>
  );
}
