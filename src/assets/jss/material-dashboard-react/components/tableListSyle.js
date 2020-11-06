const tableListStyle = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
    cardButton: {
      backgroundColor: "#3F51B5",
    },
  },
  inputs: {
    display: "flex",
    font: "inherit",
    color: "#000",
    border: "1.5px solid #005288",
    borderRadius: "5px",
    width: "70%",
    margin: "0",
    padding: "8px",
    minWidth: "0",
    background: "none",
    letterSpacing: "inherit",
    animationDuration: "10ms",
  },
  button: {
    marginTop: "40px",
    marginBottom: "20px",
  },
});
export default tableListStyle;
