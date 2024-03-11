import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

export const Paginate = ({ nrOfPages, currentPage, onChange }: any) => {
  console.log(">>> nrOfPages", nrOfPages);
  return (
    <div>
      <Stack alignItems="center" spacing={2} marginTop={5}>
        <Pagination
          count={nrOfPages}
          page={currentPage}
          showFirstButton
          showLastButton
          color="primary"
          onChange={onChange}
          size="large"
        />
      </Stack>
    </div>
  );
};
