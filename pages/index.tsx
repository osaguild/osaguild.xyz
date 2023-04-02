import dynamic from "next/dynamic";
import Layout from "@/components/Layout";

const DynamicTerminal = dynamic(() => import("@/components/Terminal/index"), {
  ssr: false,
});

function Top() {
  return (
    <Layout>
      <DynamicTerminal />
    </Layout>
  );
}

export default Top;
