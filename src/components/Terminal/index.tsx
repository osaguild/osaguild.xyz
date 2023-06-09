import { FC, useRef, useEffect } from "react";
import { Terminal as Xterm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { v4 as uuidv4 } from "uuid";
import "xterm/css/xterm.css";
import { supportedModes } from "@/consts";

const Terminal: FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const uuid = uuidv4();

  useEffect(() => {
    const terminalInstance = new Xterm();
    const fitAddon = new FitAddon();
    let inputBuffer = "";
    let mode: Mode | undefined = undefined;
    terminalInstance.loadAddon(fitAddon);

    // clear input buffer
    const clear = () => {
      inputBuffer = "";
      terminalInstance.write("> ");
    };

    // call api
    const post = (message: string) => {
      const requestBody =
        mode === "CHAT"
          ? { name: uuid, message: inputBuffer.trim() }
          : { query: inputBuffer.trim() };
      fetch(supportedModes.find((m) => m.mode === mode)?.uri!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error(`failed to call api. http status: ${res.status}`);
          }
        })
        .then((data) => {
          terminalInstance.writeln(data.message);
          clear();
        })
        .catch((err) => {
          throw new Error("error occurred. please try again.");
        });
    };

    // init terminal
    if (terminalRef.current) {
      terminalInstance.open(terminalRef.current);
      fitAddon.fit();
    }
    terminalInstance.writeln(`please select mode. "chat" or "summary"`);
    clear();

    // handle event
    terminalInstance.onData((data) => {
      const message = inputBuffer.trim();
      const code = data.charCodeAt(0);

      // if enter key is pressed
      if (code === 13) {
        terminalInstance.write("\r\n");

        try {
          if (message === "") {
            throw new Error("please type something.");
          } else if (!mode && message === "chat") {
            mode = "CHAT";
            terminalInstance.writeln("start chatting. say hello.");
            clear();
          } else if (!mode && message === "summary") {
            mode = "SUMMARY";
            terminalInstance.writeln(
              "start summarizing web site. enter key word for search."
            );
            clear();
          } else if (mode) {
            post(message);
          } else {
            throw new Error(`please select mode. "chat" or "summary"`);
          }
        } catch (e: any) {
          terminalInstance.writeln(e.message);
          clear();
        }

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
