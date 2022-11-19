import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    // backgroundColor: '#371A45',
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(5),
    width: 500,
    textAlign: 'center',
    color: '#ffffff'
  },
  logo: {
    marginBottom: '15px',
    height: '130px'
  },
  titleText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 600
  },
  textBox: {
    color: '#FFFFFF'
  },
  btn: {
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    width: 100,
    backgroundColor: '#CF6BFF',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#FFFFFF',
      color: '#371A45'
    }
  },
  btnReg: {
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
    width: 100,
    backgroundColor: '#CF6BFF',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#FFFFFF',
      color: '#371A45'
    }
  },
  copyrightText: {
    color: '#545454',
    textAlign: 'center'
  }
}));
