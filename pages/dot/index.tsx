import Layout from "@/components/Layout";
import Dot from "@/components/Dot";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";

function DotPage() {
  return (
    <Layout>
      <Flex width="100%">
        <Box width="60%">
          <Dot />
        </Box>
        <Box width="40%">
          <Heading size="3xl" mb="16px">
            dot
          </Heading>
          <Text fontSize="2xl">you can make dot art. data can be stored as 160 bit data. do you know what 160 bit means? it means an ethereum address.</Text>
        </Box>
      </Flex>
    </Layout>
  );
}

export default DotPage;
