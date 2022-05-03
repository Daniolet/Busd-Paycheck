// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { styled } from "@mui/system";
import { config } from "../../config";
import logo from "../../assets/FullLogo.png";
import Connect from "./Connect";

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));
const CustomLinks = styled(Link)(({ theme }) => ({
  color: theme.palette.text.textLight,
  textDecoration: "none",
  fontWeight: "500",
  cursor:"pointer",
  padding:"10px 16px",
  '&:hover': {
    color: theme.palette.primary.main,
  },
  // '&:hover,&:focus,&:active': {
  //   color: theme.palette.primary.main,
  // },
}));
// const ButtonContainer = styled(Grid)(({ theme }) => ({
//   [theme.breakpoints.down("sm")]: {
//     flexDirection: "column",
//     "> div": {
//       marginLeft: 0,
//       marginRight: 0,
//     },
//   },
// }));

export default function Header() {
  return (
    <Wrapper>
      <img src={logo} alt="" width={"42%"} style={{ marginTop: -10, minWidth: "225px" }} />
      <Connect responsive={false} />
      {/* <Typography variant="h4" color="secondary" >BUSD PAYCHECK</Typography>
      <Typography variant="h6" color="secondary" sx={{fontWeight: "400"}}>AUTOMINER</Typography>
      <Connect responsive={false} /> */}
      {/* <Typography variant="h6" marginTop={3}>
        Invest Safely, Contract Ownership has been Renounced
      </Typography> */}
      <Box component="div" sx={{width: "100%",display: "flex",alignItems: "center",justifyContent: "center",my:4}}>
        <CustomLinks href={config.scanLink} variant="body2" component="a">CONTRACT</CustomLinks>
        <CustomLinks href="#/" variant="body2" component="a">AUDIT</CustomLinks>
        <CustomLinks href="https://t.me/headdev" variant="body2" component="a">TELEGRAM</CustomLinks>
      </Box>
      {/* <ButtonContainer container>
        <Grid item flexGrow={1} marginRight={1} marginTop={3} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={(e) => {
              e.preventDefault();
              window.location.href='https://luckycat.money/';
              }}
              >
                  Home
            </Button>
        </Grid>
      </ButtonContainer> */}
    </Wrapper>
  );
}
