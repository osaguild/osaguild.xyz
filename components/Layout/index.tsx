import { FunctionComponent } from "react";
import Head from "next/head";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Head>
      <title>osaguild.xyz</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default Layout;
