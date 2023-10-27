import {  styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


export const CustomTextField = styled(TextField)({
  backgroundColor: "#grey",
 "& label.Mui-focused": {
    color: "#0fe9ef",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#0fe9ef",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
    
      borderRadius: "12px",
      borderColor: "#0fe9ef",
    },
    "&:hover fieldset": {
      borderColor: "#0fe9ef",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0fe9ef",
    },
  },
  ".MuiInputBase-root": {
    backgroundColor: "#grey",
  },
  "& .MuiSelect-icon": {
    color: "#fff",
  },
});