import { TableCell } from "@mui/material";
import React from "react";

const TableCellStyled = ({ children }) => {
  return (
    <TableCell
      sx={{
        color: "#4a80f1",
        fontWeight: "bold",
        fontFamily: "Open sans",
        width: 300,
        textAlign: "start",
      }}
      align="right"
    >
      {children}
    </TableCell>
  );
};

export default TableCellStyled;
