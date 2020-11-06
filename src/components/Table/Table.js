import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditModal from "../EditModal/Modal";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, handleDelete } = props;

  function teste() {
    tableData.map((item) => {
      console.log(item.avatar);
    });
  }

  teste();

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.Data.map((item, key) => {
                  if (key === 0) {
                    return null;
                  }
                  if (item === "Actions") {
                    return (
                      <TableCell
                        style={{ display: "flex" }}
                        className={classes.tableCell}
                        key={key}
                      >
                        <EditModal editData={prop} />
                        <IconButton
                          color="primary"
                          onClick={() => handleDelete(prop)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    );
                  }
                  if (prop.avatar && key === 4) {
                    console.log(prop.avatar);
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        <img
                          src={item}
                          alt="User Avatar"
                          className={classes.avatar}
                        />
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
