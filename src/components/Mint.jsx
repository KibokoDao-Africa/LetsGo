import React, { useState, useCallback } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { CustomTextField } from "./CustomeTextBox";

const Mint = () => {
  const address = useAddress();
  const [amount, setAmount] = useState(1);
  // State to store generated random IDs
  const [tokenIds, setTokenIds] = useState(4);
  const [imageFile, setImageFile] = useState(null); // Added state for image file
  const { mutateAsync: upload } = useStorageUpload();
  const { contract } = useContract(
    "0x717F9d7605b0669f1c81e71385763634a556faC9"
  );
  const { mutateAsync: mintTo, isLoading } = useContractWrite(
    contract,
    "mintTo"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const mintNft = useCallback(async () => {
    try {
      if (!imageFile) {
        console.error("Please select an image file");
        return;
      }

      // Upload the image file to IPFS
      const uris = await upload({ data: [imageFile] });
      if (typeof uris !== "string") {
        console.error("Invalid IPFS CID");
        return;
      }

      // Mint an NFT with the given IPFS CID
      const data = await mintTo({ args: [address, tokenIds, uris, amount] });

      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }, [address, amount, imageFile, mintTo, tokenIds, upload]);

  return (
    <div>
      <Box>
        <CustomTextField
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          sx={{ mt: "7%" }}
          fullWidth
          size="small"
          label="amount"
          inputProps={{
            sx: {
              "&::placeholder": {
                color: "#fff",
              },
              color: "#fff",
              backgroundColor: "grey",
              borderRadius: "12px",
            },
          }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <Button
          sx={{
            mt: "7%",
            background: "#0fe9ef",
            borderRadius: "15px",
            "&:hover": { background: "#0fe9ef" },
            textTransform: "capitalize",
            width: "100%",
            whiteSpace: "nowrap",
          }}
          onClick={mintNft}
          disabled={isLoading}
        >
          Mint/Create Tickets {isLoading && <CircularProgress size={20} />}
        </Button>
      </Box>
    </div>
  );
};

export default Mint;
