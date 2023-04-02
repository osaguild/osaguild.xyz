import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicTerminal = dynamic(() => import("@/components/Terminal"), {
	ssr: false,
});

export default function Home() {
	const [showTerminal, setShowTerminal] = useState(false);
	return (
		<>
			<DynamicTerminal />
		</>
	);
}
