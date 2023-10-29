import { CustomTextField } from "@/components/CustomeTextBox";
import {
  Box,
  Button,
  Container,
  Input,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useRef, useState } from "react";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useCreateEventMutation } from "@/state/services";
import Mint from "@/components/Mint";

const Create = () => {
  const address = useAddress();
  const [amount, setAmount] = useState<number>(1);
  // State to store generated random IDs
  const [tokenIds, setTokenIds] = useState<number>(4);

  const [image, setImage] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const fileInputRef = useRef<any>(null);

  const [image2, setImage2] = useState<any>();
  const [preview2, setPreview2] = useState<any>(null);
  const fileInputRef2 = useRef<any>(null);

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    bannerImageUri: "",
    venue: "",
    date: "",
    time: "",
    deployerWalletAddress: "",
  });

  const { contract } = useContract(
    "0x717F9d7605b0669f1c81e71385763634a556faC9"
  );
  const { mutateAsync: upload } = useStorageUpload();
  const { mutateAsync: mintTo, isLoading: mintLoading } = useContractWrite(
    contract,
    "mintTo"
  );

  const mintNft = async () => {
    try {
      const dataToUpload: never[] = [];

      // And upload the data with the upload function
      const uris = await upload({ data: dataToUpload });
      const data = await mintTo({ args: [address, tokenIds, uris, amount] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const [createEvent, { isLoading, isError, isSuccess }] =
    useCreateEventMutation();

  const handleCreateEvent = async (event: any) => {
    console.log("eventData", eventData);
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("description", eventData.description);
    formData.append("image", image);
    formData.append("venue", eventData.venue);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    if (address) {
      formData.append("deployerWalletAddress", address);
    }

    createEvent(formData);
    console.log("data is", formData);
  };

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as any);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  useEffect(() => {
    if (image2) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview2(reader.result as any);
      };
      reader.readAsDataURL(image2);
    } else {
      setPreview2(null);
    }
  }, [image2]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0A0A11" }}>
      <Toolbar />
      {address ? (
        <Container maxWidth="sm" sx={{ pt: "4%", pb: "4%" }}>
          <Typography
            mb="7%"
            fontSize={{ xs: "18px", sm: "28px", md: "40px" }}
            textAlign="center"
            color="#fff"
          >
            Create Your Event
          </Typography>
          <Box component="form" onSubmit={handleCreateEvent}>
            <CustomTextField
              fullWidth
              size="small"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              placeholder="Name of Your Event"
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
            <CustomTextField
              sx={{ mt: "7%" }}
              name="venue"
              value={eventData.venue}
              onChange={handleChange}
              fullWidth
              size="small"
              placeholder="Venue of the Event"
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
            <CustomTextField
              name="description"
              value={eventData.description}
              onChange={handleChange}
              sx={{ mt: "7%" }}
              multiline
              minRows={4}
              fullWidth
              placeholder="Description of the Event"
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "#fff",
                  },
                  color: "#fff",
                },
              }}
              InputProps={{
                style: { backgroundColor: "grey", borderRadius: "12px" }, // Set your desired background color here
              }}
            />
            <CustomTextField
              sx={{ mt: "7%" }}
              fullWidth
              disabled
              onChange={handleChange}
              value={address}
              size="small"
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
            <Typography mt="7%">Banner for the Event:</Typography>
            <Box
              sx={{
                borderRadius: "15px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="rt"
                  style={{
                    width: "291px",
                    height: "173px",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                  onClick={() => {
                    setImage(null);
                  }}
                />
              ) : (
                <Button
                  sx={{
                    mt: "1%",
                    width: "291px",
                    height: "173px",
                    color: "#000",
                    background: "#D9D9D9",
                    "&:hover": { background: "#D9D9D9" },
                    borderRadius: "15px",
                    textTransform: "capitalize",
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  upload Image
                </Button>
              )}
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                // accept="image/*"
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) =>
                    setImage(event.target.files?.[0])

                  // const file = event.target?.files[0];
                  // console.log("the file", file);
                  // if (file) {
                  //   setImage(file);

                  // } else {
                  //   setImage(null);
                  // }
                }
              />
            </Box>
            <Button
              type="submit"
              sx={{
                mt: "7%",
                background: "#0fe9ef",
                borderRadius: "15px",
                "&:hover": { background: "#0fe9ef" },
                textTransform: "capitalize",
                width: "100%",
                whiteSpace: "nowrap",
              }}
            >
              Create Event
            </Button>
          </Box>
          <Typography
            mt="10%"
            textAlign="center"
            fontSize={{ xs: "18px", sm: "28px", md: "40px" }}
            color="#fff"
          >
            Mint Your Tickets
          </Typography>
          <Box
            sx={{
              borderRadius: "15px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            {preview2 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview2}
                alt="rt"
                style={{
                  width: "291px",
                  height: "173px",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
                onClick={() => {
                  setImage2(null);
                }}
              />
            ) : (
              <Button
                sx={{
                  mt: "1%",
                  width: "291px",
                  height: "173px",
                  color: "#000",
                  background: "#D9D9D9",
                  "&:hover": { background: "#D9D9D9" },
                  borderRadius: "15px",
                  textTransform: "capitalize",
                }}
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef2.current.click();
                }}
              >
                upload NFT
              </Button>
            )}
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef2}
              accept="image/*"
              multiple={false}
              onChange={(event) => {
                const files = event.target.files;
                if (files && files.length > 0) {
                  const file = files[0];
                  setImage2(file);
                } else {
                  setImage2(null);
                }
              }}
            />
          </Box>
          <CustomTextField
            sx={{ mt: "7%" }}
            fullWidth
            size="small"
            placeholder="Price in Eth"
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
          <CustomTextField
            sx={{ mt: "7%" }}
            fullWidth
            size="small"
            placeholder="Total supply"
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
          >
            Mint/Create Tickets
          </Button>
          <Mint />
        </Container>
      ) : (
        <Container
          sx={{ height: "100vh", display: "flex", alignItems: "center" }}
        >
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <Typography
              textAlign="center"
              color="#fff"
              fontWeight={700}
              fontSize={{ xs: "18px", sm: "28px", md: "40px" }}
            >
              Connect your Wallet to Create Event
            </Typography>
            <LinearProgress sx={{ backgroundColor: "#0fe9ef" }} />
            <LinearProgress sx={{ backgroundColor: "#0fe9ef" }} />
            <LinearProgress sx={{ backgroundColor: "#0fe9ef" }} />
          </Stack>
        </Container>
      )}
    </Box>
  );
};

export default Create;
