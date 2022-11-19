import { makeStyles } from "@material-ui/core/styles";
import { ArrowLeft } from "@material-ui/icons";

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#000000",
    boxShadow: "0 5px 3px -3px rgba(0, 0, 0, 0.40)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    color: "white",
    textDecoration: "none",
  },
  image: {
    marginRight: "10px",
  },
  grow: {
    flexGrow: 1,
  },
  logout: {
    marginLeft: "20px",
  },
  link: {
    margin: theme.spacing(1, 1.5),
    justifyContent: ArrowLeft,
    color: "white",
  },
  nav: {
    margin: "auto",
  },
}));
