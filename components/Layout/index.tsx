import { FunctionComponent } from "react";
import Head from "next/head";
import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  HStack,
  Link,
  Image,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>osaguild.xyz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box m="32px">
        <Flex
          as="header"
          alignItems="flex-end"
          justifyContent="space-between"
          padding="1rem"
          borderBottom="1px solid"
          borderColor="gray.200"
          mb="32px"
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
        {children}
      </Box>
    </>
  );
};

export default Layout;
