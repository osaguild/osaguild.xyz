import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";

const DynamicTerminal = dynamic(() => import("@/components/Terminal/index"), {
  ssr: false,
});

function Top() {
  return (
    <Layout>
      <Flex width="100%">
        <Box width="40%" height="200px">
          <Heading size="3xl" mb="16px">say Hello</Heading>
          <Text fontSize="2xl">Hi, I want to talk to you, can you type hello?</Text>
        </Box>
        <Box width="60%" height="200px">
          <DynamicTerminal />
        </Box>
      </Flex>
    </Layout>
  );
}

export default Top;
