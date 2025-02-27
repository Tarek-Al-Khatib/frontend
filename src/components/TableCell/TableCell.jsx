import { TableCell } from "@mui/material";
import React from "react";

const TableCellStyled = ({
  children,
  start = false,
  end = false,
  display,
  dark,
  bold,
}) => {
  const width = start ? 300 : "auto";
  const position = start ? "start" : "center";
  return (
    <TableCell
      sx={{
        color: dark ? "#1e25a6" : "#4a80f1",
        fontWeight: bold ? "bold" : "medium",
        fontFamily: "Open sans",
        width: width,
        textAlign: position,
        fontSize: 16,
      }}
      align="right"
    >
      {children}
    </TableCell>
  );
};

export default TableCellStyled;
