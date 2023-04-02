import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  HStack,
  Link,
  Image,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import Head from "next/head";

const DynamicTerminal = dynamic(() => import("@/components/Terminal"), {
  ssr: false,
});

function Top() {
  return (
    <>
      <Head>
        <title>osaguild.xyz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box>
        <Flex
          as="header"
          alignItems="flex-end"
          justifyContent="space-between"
          padding="1rem"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Image src="/osa.png" alt="osa" w="200px" />
          <Tabs w="100%" variant="unstyled" ml="30px">
            <TabList justifyContent="flex-start">
              <Tab>about</Tab>
              <Tab>products</Tab>
              <Tab>contact</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
          </Tabs>
          <HStack spacing={4}>
            <Link href="https://github.com/osaguild" isExternal>
              <FaGithub size="30" />
            </Link>
            <Link href="https://twitter.com/osaguild" isExternal>
              <FaTwitter size="30" />
            </Link>
          </HStack>
        </Flex>

        <Box as="main" padding="1rem">
          <DynamicTerminal />
        </Box>
      </Box>
    </>
  );
}

export default Top;
