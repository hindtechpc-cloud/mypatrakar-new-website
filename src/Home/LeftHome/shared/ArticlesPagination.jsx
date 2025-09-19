import  {useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const ArticlesPagination = ({
  setArticlList,
  articles = [],
  totalArticles = 0,
}) => {
  // pagination states
  const [page, setPage] = useState(1);
  const articlesPerPage = 2;
  // calculate current articles
  const startIndex = (page - 1) * articlesPerPage;
  const currentArticles = articles.slice(
    startIndex,
    startIndex + articlesPerPage
  );
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value); // ✅ sirf page update karo
    setArticlList(currentArticles);
  };
  return (
    <div className="mt text-sm text-gray-200">
      {totalPages > 1 && (
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#374151", // text color for unselected
                backgroundColor: "#d1d5db80", // gray bg
                borderRadius: "8px",
                border: "1px solid #fff",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#000", // white bg for selected
                color: "#fff", // black text
                fontWeight: "bold",
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "#9ca3af", // darker gray on hover
                color: "blue",
              },
            }}
          />
        </Stack>
      )}
    </div>
  );
};
