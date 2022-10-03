import { ethers } from "ethers";
import dynamic from "next/dynamic";
import { useSigner } from "wagmi";

export const SocketBridge = () => {
  const { data: signer } = useSigner();
  const DynamicBridge = dynamic(
    // @ts-ignore
    () => import("@socket.tech/widget").then((mod) => mod.Bridge),
    {
      ssr: false,
    }
  );

  // @ts-ignore
  const web3Provider = !!signer && new ethers.providers.Web3Provider((signer?.provider).provider);
  return (
    <DynamicBridge
      // @ts-ignore
      API_KEY={"645b2c8c-5825-4930-baf3-d9b997fcd88c"}
      provider={web3Provider}
      customize={{
        secondary: "rgb(68,69,79)",
        primary: "rgb(31,34,44)",
        accent: "rgb(131,249,151)",
        onAccent: "rgb(0,0,0)",
        interactive: "rgb(0,0,0)",
        onInteractive: "rgb(250,250,250)",
        text: "rgb(255,255,255)",
        secondaryText: "rgb(200,200,200)",
      }}
    />
  );
};
