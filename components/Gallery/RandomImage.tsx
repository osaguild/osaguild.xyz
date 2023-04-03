import { FC, useEffect, useRef } from "react";
import { Image } from "@chakra-ui/react";
import styled from "styled-components";

const ImageWrapper = styled.div`
  position: absolute;
`;

interface RandomImageProps {
  path: string;
}

const RandomImage: FC<RandomImageProps> = ({ path }) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveImage = () => {
      if (imageRef.current) {
        const maxX = window.innerWidth - imageRef.current.clientWidth - 32;
        const maxY = window.innerHeight - imageRef.current.clientHeight - 160;
        const x = Math.floor(Math.random() * maxX) + 16;
        const y = Math.floor(Math.random() * maxY) + 128;
        imageRef.current.style.left = `${x}px`;
        imageRef.current.style.top = `${y}px`;
      }
    };

    const randomSpeed = Math.floor(Math.random() * 4000) + 1000;
    moveImage();
    const interval = setInterval(moveImage, randomSpeed);
    return () => clearInterval(interval);
  }, []);

  return (
    <ImageWrapper ref={imageRef}>
      <Image src={path} alt="random image" w="256px" />
    </ImageWrapper>
  );
};

export default RandomImage;
