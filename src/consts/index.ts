const tabs = [
  {
    label: "hello",
    image: "/tabs/hello.png",
    path: "/hello",
  },
  {
    label: "dot",
    image: "/tabs/dot.png",
    path: "/dot",
  },
  {
    label: "coffee",
    image: "/tabs/coffee.png",
    path: "/coffee",
  },
];

const pics = [
  "/images/ai.png",
  "/images/app.png",
  "/images/art.png",
  "/images/awesome.png",
  "/images/dapp.png",
  "/images/deep.png",
  "/images/dev.png",
  "/images/doop.png",
  "/images/geek.png",
  "/images/goal.png",
  "/images/me.png",
  "/images/music.png",
  "/images/web.png",
  "/images/www.png",
  "/images/z.png",
];

const supportedModes: { mode: Mode; uri: string }[] = [
  {
    mode: "CHAT",
    uri: "api/chat",
  },
  {
    mode: "SUMMARY",
    uri: "api/summary",
  },
];

export { tabs, pics, supportedModes };
