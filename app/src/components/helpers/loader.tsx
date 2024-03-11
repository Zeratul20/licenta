// import spinner from "../../assets/gif/loader.gif";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./loader.css";
import { Stack } from "@mui/material";

// export const Loader: view = () => {
//   return (
//     <div className="spinner">
//       <img src={spinner} />
//       <p> Va rugam asteptati cateva momente... </p>
//     </div>
//   );
// };

export const Loader = () => {
  return (
    <Stack alignItems="center">
      <Box
        sx={{ display: "flex", top: "50%", position: "absolute"}}
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    </Stack>
  );
};
