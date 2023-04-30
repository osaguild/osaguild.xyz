import { Box, VStack, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

const Pixel = ({
  value,
  onClick,
  size,
}: {
  value: boolean;
  onClick: () => void;
  size: number;
}) => (
  <Box
    bg={value ? "black" : "white"}
    onClick={onClick}
    width={`${size}px`}
    height={`${size}px`}
    border="1px solid gray"
  />
);

const Dot = () => {
  const [grid, setGrid] = useState(
    Array(8)
      .fill(false)
      .map(() => Array(16).fill(false))
  );
  const [size, setSize] = useState(20);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      const newSize = Math.floor((ref.current?.offsetWidth || 0) / 16);
      setSize(newSize);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

  const togglePixel = (i: number, j: number) => {
    const newGrid = [...grid];
    newGrid[i][j] = !newGrid[i][j];
    setGrid(newGrid);
  };

  const getHexData = () => {
    const bitData = grid
      .map((row) => row.map((cell) => (cell ? "1" : "0")).join(""))
      .join("");
    const hexData = BigInt(`0b${bitData}`).toString(16);
    return hexData;
  };

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Box ref={ref} display="flex" flexWrap="wrap" width="100%">
        {grid.map((row, i) => (
          <Box key={`pixel_${i}`} display="flex">
            {row.map((cell, j) => (
              <Pixel
                key={`${i}-${j}`}
                value={cell}
                onClick={() => togglePixel(i, j)}
                size={size}
              />
            ))}
          </Box>
        ))}
      </Box>
      <VStack spacing={4}>
        <Text fontFamily="monospace" fontWeight="bold">
          0x{getHexData()}
        </Text>
      </VStack>
    </Flex>
  );
};

export default Dot;
