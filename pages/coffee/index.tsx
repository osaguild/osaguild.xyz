import Layout from "@/components/Layout";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";

function CoffeePage() {
  return (
    <Layout>
      <Flex width="100%">
        <Box width="40%" height="200px">
          <Heading size="3xl" mb="16px">
            coffee break
          </Heading>
          <Text fontSize="2xl">
            the coffee gives you a space to relax every morning like your
            morning coffee braek.
          </Text>
        </Box>
        <Box width="60%" height="200px" />
      </Flex>
    </Layout>
  );
}

export default CoffeePage;
