import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";

const DynamicTerminal = dynamic(() => import("@/components/Terminal/index"), {
  ssr: false,
});

function Top() {
  return (
    <Layout>
    </Layout>
  );
}

export default Top;
