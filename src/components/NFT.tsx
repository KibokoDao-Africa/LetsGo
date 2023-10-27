import React from "react";
import { NFT } from "@thirdweb-dev/sdk";
import {
  NFT_COLLECTION_ADDRESS,
  MARKETPLACE_ADDRESS,
} from "../../constants/addresses";
import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { Box, Skeleton, Typography } from "@mui/material";

type Props = {
  nft: NFT;
};

const NFTComponent = ({ nft }: Props) => {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });
  return (
    <div>
      <Box sx={{ background: "gray", borderRadius: "7px" }}>
        <ThirdwebNftMedia
          metadata={nft.metadata}
          height={"100%"}
          width={"100%"}
        />
        <Typography>Token Id # {nft.metadata.id}</Typography>
        <Typography>{nft.metadata.name}</Typography>
        <Box>
          {loadingMarketplace || loadingDirectListing ? (
            <Skeleton />
          ) : directListing && directListing[0] ? (
            <Box>
              <Typography>Price</Typography>
              <Typography>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</Typography>
            </Box>
          ) : (
            <Box>
              <Typography>Price</Typography>
              <Typography>Not Listed</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default NFTComponent;
