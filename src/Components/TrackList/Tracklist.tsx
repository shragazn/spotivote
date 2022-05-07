import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import React from "react";
type Props = {
  tracks: [
    {
      name: string;
      id: string;
      album: { name: string; images: any[] };
      artists: [{ name: string }];
    }
  ];
};

interface TitleProps {
  readonly isNotHoverable?: boolean;
}

const TrackList = styled.div`
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 30px;
`;

const Track = styled.div<TitleProps>`
  list-style-type: none;
  display: grid;
  grid-template-columns: 32px 3fr 2fr 2fr auto;
  grid-gap: 16px;
  align-items: center;
  padding: 0px 16px;
  border-radius: 16px;
  &:hover {
    background-color: ${(props) => (!props.isNotHoverable ? "#fafdff;" : "")};
  }
`;

const Field = styled.div<TitleProps>`
  padding: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  display: block;
  &:hover {
    color: ${(props) => (!props.isNotHoverable ? "#7f7f7f" : "")};
    text-decoration-line: ${(props) =>
      !props.isNotHoverable ? "underline" : "none"};
  }
`;

const Cover = styled.img`
  border-radius: 100%;
  width: 40px;
`;

export default function Tracklist({ tracks }: Props) {
  return (
    <TrackList>
      <h1>Top Tracks</h1>
      <Track isNotHoverable={true}>
        <Field />
        <Field isNotHoverable={true}>
          <b>Name</b>
        </Field>
        <Field isNotHoverable={true}>
          <b>Album</b>
        </Field>
        <Field isNotHoverable={true}>
          <b>Artist</b>
        </Field>
      </Track>
      <hr></hr>
      {tracks.map((track) => (
        <Track key={track.id}>
          <Cover src={track.album.images[2].url}></Cover>
          <Field>{track.name}</Field>
          <Field>{track.album.name}</Field>
          <Field>
            {track.artists.map((artist, i) =>
              i == track.artists.length - 1 ? (
                <a>{artist.name} </a>
              ) : (
                <a>{artist.name}, </a>
              )
            )}
          </Field>
          <Field>
            <FontAwesomeIcon
              icon={faPlus}
              size={"lg"}
              alignmentBaseline={"middle"}
            />
          </Field>
        </Track>
      ))}
    </TrackList>
  );
}
