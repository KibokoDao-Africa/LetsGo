import React from "react";
import { NFT as NFTTYpe } from "@thirdweb-dev/sdk";
import NFTComponent from "./NFT";
import Link from "next/link";
import { NFT_COLLECTION_ADDRESS } from "../../constants/addresses";
import { type } from "os";
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";

type Props = {
  isLoading: boolean;
  data: NFTTYpe[] | undefined;
  overrideOnclickBehaviour?: (nft: NFTTYpe) => void;
  emptyText?: string;
};

const NFTGrid = ({
  isLoading,
  data,
  overrideOnclickBehaviour,
  emptyText = "No NFTs yet!",
}: Props) => {
  return (
    <Box>
      <Container>
        <Toolbar />
        <Grid container spacing={2}>
          {isLoading ? (
            [...Array(20)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton key={index} sx={{ height: "200px", width: "100%" }} />
              </Grid>
            ))
          ) : data && data.length > 0 ? (
            data.map((nft, index) =>
              !overrideOnclickBehaviour ? (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Link
                    href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
                    key={nft.metadata.id}
                  >
                    <NFTComponent nft={nft} />
                  </Link>
                </Grid>
              ) : (
                <Box
                  key={nft.metadata.id}
                  onClick={() => overrideOnclickBehaviour(nft)}
                >
                  <NFTComponent nft={nft} />
                </Box>
              )
            )
          ) : (
            <Typography>{emptyText}</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default NFTGrid;
