import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import ReferralLink from "./ReferralLink";

import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";


const CardWrapper = styled(Card)(({ theme }) => ({
  background: theme.palette.text.darkBgColor
}));
const CustomButtonDark = styled(Button)(({ theme }) => ({
  color: theme.palette.text.textLight,
  background: theme.palette.text.darkBgColor,
  border: `1px solid ${theme.palette.text.textLight}`,
  padding: "8px 18px",
  "&:hover,&:focus": {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.text.textLight,
    boxShadow: "none"
  },
  "&:disabled": {
    color: theme.palette.text.darkBgColor,
    borderColor: theme.palette.text.textLight,
    backgroundColor: "#46494C"
  }
}));
const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0
    }
  }
}));

export default function NutritionFacts(props) {
  const {
    contract,
    wrongNetwork,
    fromWei,
    web3
  } = useContractContext();
  const { address, chainId } = useAuthContext();
  const [referralData, setReferralData] = useState({
    earn: 0,
    withdraw: 0,
    reward: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchReferralData = async () => {
    if (!web3 || wrongNetwork || !address) {
      setReferralData({
        earn: 0,
        withdraw: 0,
        reward: 0,
      });
      return;
    }

    try {
      const [earnedAmount, withdrawAmount, rewardAmount] =
        await Promise.all([
          contract.methods
            .getUserReferralTotalBonus(address)
            .call()
            .catch((err) => {
              console.error("earnedAmount", err);
              return 0;
            }),
          contract.methods
            .getUserReferralBonus(address)
            .call()
            .catch((err) => {
              console.error("withdrawAmount", err);
              return 0;
            }),
          contract.methods
            .getUserReferralWithdrawn(address)
            .call()
            .catch((err) => {
              console.error("reward", err);
              return 0;
            })
        ]);
      setReferralData({
        earn: fromWei(`${earnedAmount}`),
        withdraw: fromWei(`${withdrawAmount}`),
        reward: fromWei(`${rewardAmount}`)
      });
    } catch (err) {
      console.error(err);
      setReferralData({
        earn: 0,
        withdraw: 0,
        reward: 0
      });
    }
  };

  useEffect(() => {
    fetchReferralData();
  }, [address, web3, chainId]);

  const reHire = async () => {
    setLoading(true);

    try {
      await contract.methods.compoundRef().send({
        from: address
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const collect = async () => {
    setLoading(true);

    try {
      await contract.methods.withdrawRef().send({
        from: address
      });
    } catch (err) {
      console.error(err);
    }
    fetchReferralData();
    setLoading(false);
  };

  return (
    <CardWrapper>
      <CardContent sx={{ p: 3 }}>
        <Grid container columnSpacing={3}>
          <Grid item md={6} xs={12}>
            <ReferralLink address={props.address} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Box component="div" sx={{ width: "100%" }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Total Referral Earned
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {referralData.earn}
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Your Referral Withdrawn
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {referralData.withdraw}
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="primary" gutterBottom>
                    Your Rewards
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {referralData.reward}
                  </Typography>
                </Grid>
            </Box>
            {/* <Box
              component="div"
              sx={{
                display: "flex",
                align: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                my: 2,
                width: "100%"
              }}
            >
              <CustomButtonDark
                disabled={wrongNetwork || !address || loading}
                onClick={reHire}>COMPOUND</CustomButtonDark>
              <CustomButtonDark
                disabled={wrongNetwork || !address || loading}
                onClick={collect}>COLLECT</CustomButtonDark>
            </Box> */}
            <ButtonContainer container>
                <Grid item flexGrow={1} marginRight={1} marginTop={3}>
                  <CustomButtonDark
                    variant="contained"
                    fullWidth
                    disabled={wrongNetwork || !address || loading}
                    onClick={reHire}
                  >
                    COMPOUND
                  </CustomButtonDark>
                </Grid>
                <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
                  <CustomButtonDark
                    variant="contained"
                    fullWidth
                    disabled={wrongNetwork || !address || loading}
                    onClick={collect}
                  >
                    COLLECT
                  </CustomButtonDark>
                </Grid>
            </ButtonContainer>
          </Grid>
        </Grid>
        {/* <Typography variant="h5" borderBottom="6px solid" paddingBottom={1}>
          BUSD LAND Details
        </Typography> */}
      </CardContent>
    </CardWrapper>
  );
}
