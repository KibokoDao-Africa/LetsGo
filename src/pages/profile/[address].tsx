// import { Box, Toolbar } from "@mui/material";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
// } from "@thirdweb-dev/react";
import React from "react";
import { NFT_COLLECTION_ADDRESS } from "../../../constants/addresses";
import { useRouter } from "next/router";
import NFTGrid from "@/components/NFTGrid";

const Profile = () => {
  const address = useAddress();
  const router = useRouter();
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    router.query.address as string
  );

  console.log("Data is ", ownedNfts);
  return (
    <Box>
      <Toolbar />
      <Toolbar />
      <Box>Test</Box>
      <Box>
        <NFTGrid
          data={ownedNfts}
          isLoading={loadingOwnedNfts}
          emptyText={"You don't have tickets yet"}
        />
      </Box>
    </Box>
  );
};

export default Profile;
