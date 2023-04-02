import { FC, useRef, useEffect } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const TerminalComponent: FC = () => {
	const terminalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const terminalInstance = new Terminal();
		const fitAddon = new FitAddon();
		terminalInstance.loadAddon(fitAddon);

		if (terminalRef.current) {
			terminalInstance.open(terminalRef.current);
			fitAddon.fit();
		}

		terminalInstance.writeln("Hello, World!");

		return () => {
			terminalInstance.dispose();
		};
	}, []);

	return <div ref={terminalRef} style={{ width: "500px", height: "500px" }} />;
};

export default TerminalComponent;
