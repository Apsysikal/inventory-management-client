import React from "react";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

import InventoryItem from "../types/InventoryItem";

interface ItemTableProps {
  listItems: Array<InventoryItem>;
  searchText: string;
}

export default function ItemTable(props: ItemTableProps) {
  const items = props.listItems;
  const searchText = props.searchText;

  const searchPredicate = (element: InventoryItem) => {
    const description = element.description.toLowerCase();
    const serial = element.serial.toLowerCase();

    const search = searchText.toLowerCase();

    return description.includes(search) || serial.includes(search);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, maxHeight: "60vh" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Bezeichnung</TableCell>
            <TableCell align="right">Seriennummer</TableCell>
            <TableCell align="right">Anzahl (St)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.filter(searchPredicate).map((item: InventoryItem) => (
            <TableRow key={item.serial}>
              <TableCell>{item.description}</TableCell>
              <TableCell align="right">{item.serial}</TableCell>
              <TableCell align="right">{item.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
