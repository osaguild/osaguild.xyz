import { FC, useState, useEffect } from "react";
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
import { useRouter } from "next/router";
import { tabs } from "@/consts";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState<number>(-1);

  useEffect(() => {
    tabs.map((e, i) => {
      if (e.path === router.pathname) {
        setTabIndex(i);
      }
    });
  }, [router.pathname]);

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
          <Link href="/">
            <Image src="/images/osa.png" alt="osa" w="256px" />
          </Link>
          <Tabs index={tabIndex} w="100%" variant="unstyled" ml="64px">
            <TabList justifyContent="flex-start">
              {tabs.map((tab) => (
                <Link href={tab.path} key={tab.label}>
                  <Tab fontSize="2xl">
                    <Image src={tab.image} alt={tab.label} w="64px" />
                  </Tab>
                </Link>
              ))}
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
