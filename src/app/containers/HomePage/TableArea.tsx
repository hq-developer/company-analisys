import React from 'react';
import { Title } from 'app/containers/HomePage/components/Title';

import TableComponent from 'app/components/Table';

export function Table() {
  return (
    <>
      <Title as="h2">Main Data</Title>
      <TableComponent
          headers={["Company Name", "Market", "Value Now", "Company Trend", "Market Trend", "Best Price", "Worst Price"]}
      />
    </>
  );
}