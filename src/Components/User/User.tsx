import { useEffect, useState } from "react";
import styled from "styled-components";
import React from "react";
import { UserType } from "../../types/User.d";

type Props = {
  token: string;
};

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  padding-top: 30px;
  align-items: center;
  background-color: #0d1015;
  color: #f2f2f2;
`;
const Name = styled.h1`
  text-align: center;
`;

const Avatar = styled.img`
  width: 100px;
  border-radius: 100%;
`;

export default function User({ token }: Props) {
  const [user, setUser] = useState<UserType>();

  const getUser = async () => {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    console.log(json);

    setUser(json);
  };

  useEffect(() => {
    getUser();
  }, [token]);

  return user ? (
    <UserContainer>
      <Avatar src={user.images[0].url} />
      <Name>{user && user.display_name}</Name>
    </UserContainer>
  ) : (
    <div>loading user...</div>
  );
}
