import Layout from "@/components/Layout";
import Dot from "@/components/Dot";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";

function Top() {
  return (
    <Layout>
      <Flex width="100%">
        <Box width="60%">
          <Dot />
        </Box>
        <Box width="40%">
          <Heading size="3xl" mb="16px">
            Dot
          </Heading>
          <Text fontSize="2xl">you can make dot art. data can be stored as hex data.</Text>
        </Box>
      </Flex>
    </Layout>
  );
}

export default Top;
