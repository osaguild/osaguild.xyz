import dynamic from "next/dynamic";

const DynamicTerminal = dynamic(() => import("@/components/Terminal"), {
	ssr: false,
});

const Top = () => {
	return <DynamicTerminal />;
};

export default Top;
