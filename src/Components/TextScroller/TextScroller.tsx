import React, { ReactNode, useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const Scroller = styled.div`
  transform: translateX(-50px);
`;

const ScrollerWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
`;

export default function TextScroller({ children }: Props) {
  const textRef = useRef(null);
  useEffect(() => {
    console.log(textRef && textRef.current);
  }, [textRef]);
  return (
    <ScrollerWrapper>
      <Scroller ref={textRef}>{children}</Scroller>
    </ScrollerWrapper>
  );
}
