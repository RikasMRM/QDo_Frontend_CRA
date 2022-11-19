import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(3, 0, 3),
  },
  card: {
    height: "350px !important",
  },
  cardHeader: {
    background: "linear-gradient(to right bottom, #6ba3f9, #ac4cd2)",
    color: "#ffffff",
    fontWeight: 800,
  },
  filters: {
    marginBottom: "50px",
  },
  iconAttachment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  title: {
    color: "#3f51b5",
    fontSize: 55,
    fontWeight: 600,
  },
  test: {
    margin: "auto",
    padding: theme.spacing(2, 0, 6),
  },
}));
