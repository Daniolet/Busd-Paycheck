import Grid from "@mui/material/Grid";

import { config } from "../../config";
import esIcon from "../assets/ESIcon.png";
import tgIcon from "../assets/TGIcon.png";
import twIcon from "../assets/TWIcon.png";
import adtIcon from "../assets/audit.png";
import Footerlogo from "../../assets/FooterLogo.png";

export default function Footer() {
  return (
    <Grid container justifyContent="center" spacing={2} marginTop={4}>
      <img src={Footerlogo} alt="" width={"240px"} style={{ marginTop: -20 }} />
      {/* <Grid item>
        
        <a href={config.scanLink} target="__blank">
          <img src={esIcon} alt="" width={48} height={48} />
        </a>
      </Grid> */}
      {/* <Grid item>
        <a href="https://t.me/busdland" target="__blank">
          <img src={tgIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://twitter.com/busdland" target="__blank">
          <img src={twIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://dappradar.com/binance-smart-chain/high-risk/busd-land" target="__blank">
          <img src={drIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://busd.land/audit" target="__blank">
          <img src={adtIcon} alt="" width={48} height={48} />
        </a>
      </Grid> */}
    </Grid>
  );
}
