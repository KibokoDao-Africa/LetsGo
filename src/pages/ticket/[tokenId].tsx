import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  NFT,
  ThirdwebNftMedia,
  ThirdwebSDK,
  Web3Button,
  useAddress,
  useContract,
  useDirectListing,
  useNFT,
  useOwnedNFTs,
  usePaperWalletUserEmail,
  useValidDirectListings,
} from "@thirdweb-dev/react";
import { useGetEventDetailQuery } from "@/state/services";
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";
import { CheckoutWithEth } from "@paperxyz/react-client-sdk-checkout-with-eth";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../constants/addresses";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  nft: NFT;
  contractMetadata: any;
};

const Ticket = ({ nft, contractMetadata }: Props) => {
  const address = useAddress();
  const email = usePaperWalletUserEmail();
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const handlePayment = () => {
    setPaymentSuccessful(true);
  };

  async function buyListing() {
    let txResult;

    if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No Listing Found");
    }
    return txResult;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0A0A11", color: "#fff" }}>
      <Container>
        <Toolbar />
        <Toolbar />
        <Grid container spacing={2}>
          {!loadingMarketplace && !loadingDirectListing ? (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    height="100%"
                    width="100%"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="h3">{nft.metadata.name}</Typography>
                    <Typography variant="subtitle1">
                      {nft.metadata.description}
                    </Typography>

                    {address && directListing && directListing[0] ? (
                      <Box>
                        <Typography>
                          {" "}
                          <span>Price: </span>
                          {directListing[0]?.currencyValuePerToken.displayValue}
                          {" " + directListing[0]?.currencyValuePerToken.symbol}
                        </Typography>

                        <Web3Button
                          contractAddress={MARKETPLACE_ADDRESS}
                          action={async () => buyListing()}
                          isDisabled={!directListing}
                        >
                          Buy Ticket
                        </Web3Button>
                      </Box>
                    ) : (
                      <Typography>Login </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
export default Ticket;

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;
  const sdk = new ThirdwebSDK("mumbai", {
    secretKey:
      "ngub90rHeUCPrXa5_J5kG-mF4xKxLiWkgaiTDqi4E2EaNpDVyVkC_aXBwh6ynER9uK_v_ghkHspAhJzku250Kg",
  });
  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);
  const nft = await contract.erc1155.get(tokenId);
  console.log("nft is:", nft);

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      nft,
      contractMetadata: contractMetadata || null,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sdk = new ThirdwebSDK("mumbai", {
    secretKey:
      "ngub90rHeUCPrXa5_J5kG-mF4xKxLiWkgaiTDqi4E2EaNpDVyVkC_aXBwh6ynER9uK_v_ghkHspAhJzku250Kg",
  });
  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);
  const nfts = await contract.erc1155.getAll();

  //console.log("These are the NFTs", nfts);

  const paths = Array.isArray(nfts)
    ? nfts.map((nft) => ({
        params: {
          contractAddress: NFT_COLLECTION_ADDRESS,
          tokenId: nft.metadata?.id || "defaultTokenId", // Replace with a default value if needed
        },
      }))
    : [];
  return {
    paths,
    fallback: "blocking",
  };
};
