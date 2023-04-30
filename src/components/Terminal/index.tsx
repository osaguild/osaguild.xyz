import { FC, useRef, useEffect } from "react";
import { Terminal as Xterm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const Terminal: FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminalInstance = new Xterm();
    const fitAddon = new FitAddon();
    terminalInstance.loadAddon(fitAddon);

    if (terminalRef.current) {
      terminalInstance.open(terminalRef.current);
      fitAddon.fit();
    }

    terminalInstance.writeln("say hello");
    terminalInstance.write("> ");

    let inputBuffer = "";

    terminalInstance.onData((data) => {
      const code = data.charCodeAt(0);

      // if enter key is pressed
      if (code === 13) {
        terminalInstance.write("\r\n");

        // call api with inputBuffer
        fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputBuffer.trim() }),
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              throw new Error(`failed to call api. http status: ${res.status}`);
            }
          })
          // if success
          .then((data) => {
            // clear inputBuffer
            inputBuffer = "";

            // show response
            terminalInstance.writeln(data.message);
            terminalInstance.write("> ");
          })
          // if failed
          .catch((err) => {
            // print error
            console.error(err);

            // Clear inputBuffer
            inputBuffer = "";

            // show error message
            terminalInstance.writeln("error occurred. please try again.");
            terminalInstance.write("> ");
          });
        // if backspace key is pressed
      } else if (code === 8 || code === 127) {
        if (inputBuffer.length > 0) {
          terminalInstance.write("\b \b");
          inputBuffer = inputBuffer.slice(0, -1);
        }
      } else {
        terminalInstance.write(data);
        inputBuffer += data;
      }
    });

    return () => {
      terminalInstance.dispose();
    };
  }, []);

  return <div ref={terminalRef} />;
};

export default Terminal;
