import { FC } from "react";
import { Box } from "@chakra-ui/react";
import RandomImage from "./RandomImage";
import { pics } from "@/consts";

const Gallery: FC = () => {
  return (
    <Box w="100px" h="100px">
      {pics.map((e, i) => (
        <RandomImage key={i} path={e} />
      ))}
    </Box>
  );
};

export default Gallery;
