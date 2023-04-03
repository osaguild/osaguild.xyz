import { FC } from "react";
import { Box } from "@chakra-ui/react";
import RandomImage from "./RandomImage";

const Gallery: FC = () => {
  return (
    <Box w="100px" h="100px">
      {Array.from({ length: 16 }, (_, i) => (
        <RandomImage key={i} path={"/osa.png"} />
      ))}
    </Box>
  );
};

export default Gallery;
