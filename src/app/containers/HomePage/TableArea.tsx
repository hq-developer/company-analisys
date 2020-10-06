import React, {FC, ReactNode} from 'react';
import { Title } from 'app/containers/HomePage/components/Title';

import TableComponent from 'app/components/Table';


export const Table: FC<{rows: Array<Array<ReactNode>>}> = ({
    rows,
}) => {
  return (
    <>
      <Title as="h2">Main Data</Title>
      <TableComponent
          headers={["Company Name", "Market", "Value Now", "Company Trend", "Market Trend", "Best Price", "Worst Price"]}
          dataSource={rows}
      />
    </>
  );
}