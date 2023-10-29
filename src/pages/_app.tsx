import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { green, purple } from "@mui/material/colors";
import {
  paperWallet,
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  localWallet,
  trustWallet,
  rainbowWallet,
  phantomWallet,
} from "@thirdweb-dev/react";
import {
  Aurora,
  AuroraTestnet,
  Mumbai,
  FlareTestnetCoston,
} from "@thirdweb-dev/chains";
import { Provider } from "react-redux";
import { store } from "../state/store";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0A0A11",
    },
    secondary: {
      main: green[500],
    },
  },
});

const activeChain = FlareTestnetCoston;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ThirdwebProvider
        activeChain={activeChain}
        clientId="434cf26a9ccd1e5a147968c5ef73d35e"
        secretKey="ngub90rHeUCPrXa5_J5kG-mF4xKxLiWkgaiTDqi4E2EaNpDVyVkC_aXBwh6ynER9uK_v_ghkHspAhJzku250Kg"
        supportedWallets={[
          paperWallet({
            paperClientId: "d790440c-2546-4c28-a6ef-407aef8dba44",
          }),
          metamaskWallet({ recommended: true }),
          coinbaseWallet(),
          walletConnect(),
          safeWallet({
            recommended: true,
            personalWallets: [
              metamaskWallet(),
              coinbaseWallet(),
              walletConnect(),
            ],
          }),
          localWallet(),
          trustWallet({ recommended: true }),
          rainbowWallet({ recommended: true }),
          phantomWallet({ recommended: true }),
        ]}
      >
        <Provider store={store}>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </ThirdwebProvider>
    </ThemeProvider>
  );
}
