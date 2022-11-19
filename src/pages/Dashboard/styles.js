import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(2, 0, 6),
  },
  cardHeader: {
    background: 'linear-gradient(to right bottom, #6ba3f9, #ac4cd2)',
  },
  iconAttachment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  title: {
    color: 'linear-gradient(to right bottom, #6ba3f9, #ac4cd2)',
    fontSize: 80,
  },
  test: {
    margin: 'auto',
    padding: theme.spacing(2, 0, 6),
  },
}));
