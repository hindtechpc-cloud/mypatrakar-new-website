import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

// 🔹 Custom Styled Pagination
const CustomPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    backgroundColor: "#e5e7eb", // unselected background (slightly darker gray)
    color: "#111827",           // unselected text (dark black)
    fontWeight: "600",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#d1d5db", // hover darker
    },
  },
  "& .Mui-selected": {
    backgroundColor: "#ffffff !important", // selected white
    color: "#000000 !important",           // selected black
    fontWeight: "700",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
});

export default function ArticlesPagination({
  totalArticles,
  articlesPerPage = 10,
  onPageChange,
}) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    if (onPageChange) {
      onPageChange(value); // parent ko page bhejo
    }
  };

  return (
    <Stack spacing={2} className="flex justify-center mt-4">
      <CustomPagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        shape="rounded"
      />
    </Stack>
  );
}
