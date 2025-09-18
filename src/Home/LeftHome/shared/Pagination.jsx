import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination count={2} shape="rounded" />
      <Pagination count={2} variant="outlined" shape="rounded" />
    </Stack>
  );
}