import {
  Box,
  Button,
  CardActionArea,
  Container,
  Grid,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useGetEventDetailQuery } from "@/state/services";
import { useRouter } from "next/router";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useNFTs,
  useOwnedNFTs,
  NFT,
} from "@thirdweb-dev/react";
import Link from "next/link";
import { type } from "os";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../constants/addresses";

interface Event {
  name: string;
  description: string;
  bannerImageUri: string;
  deployerWalletAddress: string;
}

type Props = {
  nft: NFT;
};

const Detail = ({ nft }: Props) => {
  const [event, setEvent] = useState<Event>(); // Use the Event interface for the state
  const router = useRouter();
  const { event_id } = router.query;
  const { data, isError, error, isLoading } = useGetEventDetailQuery(event_id);
  const { contract, isLoading: loadingMarketPlace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { contract: NFT_Contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  console.log("Event id is", event_id);
  useEffect(() => {
    if (data) {
      setEvent(data as Event); // Type assertion as the data may not be fully defined
    }
  }, [data]);

  console.log("Event data", event?.deployerWalletAddress);

  const {
    data: nfts,
    isLoading: nftsLoading,
    error: nftError,
  } = useOwnedNFTs(NFT_Contract, event?.deployerWalletAddress);

  // const {
  //   data: nfts,
  //   isLoading: nftsLoading,
  //   error: nftError,
  // } = useNFTs(contract);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0A0A11" }}>
      <Toolbar />
      <Container maxWidth="xl">
        <Card sx={{ backgroundColor: "#232628" }}>
          <CardMedia
            component="img"
            height="400"
            image={event?.bannerImageUri}
            style={{ objectFit: "cover", width: "100%" }}
          />
          <CardContent sx={{}}>
            <Typography gutterBottom variant="h5" component="div" color="#fff">
              {event?.name}
            </Typography>
            <Typography color="#fff">Date and time</Typography>
            <Typography variant="body2" color="#fff">
              {event?.description}
            </Typography>
          </CardContent>
        </Card>
        <Grid container spacing={2}>
          {nfts?.map((nft) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              mt="7%"
              key={nft.metadata.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                key={nft.metadata.id}
                href={`/ticket/${nft.metadata.id}?deployerWalletAddress=${event?.deployerWalletAddress}`}
                style={{ width: "100%" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: "#232628",
                    p: "10px",
                    borderRadius: "5px",
                    maxHeight: "400px",
                    height: "100%",
                  }}
                >
                  <ThirdwebNftMedia metadata={nft.metadata} />
                  <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                    {nft.metadata.name}.
                  </Typography>
                  <Box>
                    <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                      {nft.metadata.description}.
                    </Typography>
                    <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                      Number of Tickets :{" "}
                      <span style={{ color: "#0fe9ef", fontWeight: 700 }}>
                        {nft.supply}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Detail;
