import React, { useState } from "react";
import { useEffect } from "react";
import { ReactChild } from "react";
import { useRef } from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

type Props = {
  index: number;
  children?: ReactChild;
  onTrigger?: () => void;
  triggerDelay?: number;
};

const Card = styled.div`
  background-color: #fff;
  width: 300px;
  height: 480px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 1px 60px 60px 0px rgb(0 4 51 / 9%);
  position: absolute;
`;

export default function Swipable({
  index,
  onTrigger,
  children,
  triggerDelay,
}: Props) {
  const indexRef = useRef(index);

  const [{ x, y, scale, rotation }, api] = useSpring(() => ({
    from: { x: 0, y: 1000, scale: 0, rotation: 0 },
    delay: 100 * index,
    x: 0,
    y: 10 - index * Math.log(1.1) * -200,
    scale: 1,
    rotation: 0,
  }));

  const bind = useDrag(
    ({ movement: [mx], active, direction: [xDir], velocity: vx }) => {
      api.start((i) => {
        let isTriggered = vx > 1;
        let x =
          !active && isTriggered
            ? window.innerWidth * xDir * vx
            : active
            ? mx
            : 0;
        const rotation = x / 100;
        const y = 10 - index;
        if (!active && isTriggered)
          setTimeout(() => {
            onTrigger && onTrigger();
          }, triggerDelay || 300);
        return { x, y, rotation, scale };
      });
    }
  );

  useEffect(() => {
    indexRef.current = index;
    api.start(() => {
      return {
        delay: index * 100,
        y: 10 - index * Math.log(1.1) * -200,
        scale: 1 - (index ^ 2) / 1000,
      };
    });
  }, [index]);

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        scale,
        rotate: rotation,
        zIndex: 10 - index,
        display: "flex",
        justifyContent: "center",
        position: "absolute",
      }}
    >
      {children}
    </animated.div>
  );
}
