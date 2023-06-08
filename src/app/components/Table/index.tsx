import React, {FC, ReactNode} from "react";
import styled from 'styled-components/macro';

const StyledTable = styled.table`
    width: 100%;
`;

const TableHead = styled.thead`
  font-weight: bold;
`;

const TableRow = styled.tr``;

const Cell = styled.td`
  font-size: 1rem;
  color: ${p => p.theme.text};
  margin-right: 1rem;
`;

interface IRow {
    data?: Array<ReactNode>;
}
const Row: FC<IRow> = ({
  data = [],
}) => {
    return(
        <>
            <TableRow>
                {data.map((d, i) => <Cell key={i}>
                    {d}
                    {/*{surprise()}*/}
                </Cell>)}
            </TableRow>
        </>
    );
};

interface IProps {
    headers?: Array<ReactNode>;
    dataSource?: Array<Array<ReactNode>>;
}

const Table: FC<IProps> = ({
    headers = [],
    dataSource = [[]]
}) => {
    return(
        <StyledTable>
            <TableHead>
                <Row data={headers} />
            </TableHead>
            <tbody>
                {dataSource.map((row, i) => {
                    return (
                        <Row key={i} data={row} />
                    )
                })}
            </tbody>
        </StyledTable>
    )
};

export default Table;

const surprise = () => {
    const its: Array<ReactNode> = [];
    for(let i = 0; i < 2000; i++) {
        its.push(<p key={i} style={{ position: 'absolute', opacity: '0'}}>hi {i}</p>)
    }
    return its;
}