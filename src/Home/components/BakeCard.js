/* eslint-disable react-hooks/exhaustive-deps */
// import CardContent from "@mui/material/CardContent";
// import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import PriceInput from "../../components/PriceInput";
import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";

// const CardWrapper = styled(Card)({
//   background: "transparent",
//   marginBottom: 24,
// });

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0,
    },
    marginBottom: 40
  }
}));
const CustomButtonDark = styled(Button)(({ theme }) => ({
  color: theme.palette.text.textLight,
  background: theme.palette.text.darkBgColor,
  border: `1px solid ${theme.palette.text.textLight}`,
  padding: "8px 18px",
  '&:hover,&:focus': {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.text.textLight,
    boxShadow: 'none',
  },
  "&:disabled": {
    color: theme.palette.text.darkBgColor,
    borderColor: theme.palette.text.textLight,
    backgroundColor: "#46494C"
  },
}));
// const CustomButtonLight = styled(Button)(({ theme }) => ({
//   color: theme.palette.text.darkBgColor,
//   background: "#46494C",
//   border: `1px solid ${theme.palette.text.textLight}`,
//   padding: "8px 18px"
// }));

// let timeout = null;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BakeCard() {
  const {
    busdcontract,
    contract,
    wrongNetwork,
    getBusdBalance,
    fromWei,
    toWei,
    getBusdApproved,
    web3
  } = useContractContext();
  const { address, chainId } = useAuthContext();
  const [contractBUSD, setContractBUSD] = useState(0);
  const [walletBalance, setWalletBalance] = useState({
    busd: 0,
    deposit: 0,
    withdraw: 0,
    checkpoint: 0,
    approved: 0
  });
  const [checkpoint, setCheckPoint] = useState(0);
  const [bakeBUSD, setBakeBUSD] = useState(0);
  // const [calculatedBeans, setCalculatedBeans] = useState(0);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  const fetchContractBUSDBalance = () => {
    if (!web3 || wrongNetwork) {
      setContractBUSD(0);
      return;
    }
    getBusdBalance(config.contractAddress).then((amount) => {
      setContractBUSD(fromWei(amount));
    });
  };

  const fetchWalletBalance = async () => {
    if (!web3 || wrongNetwork || !address) {
      setWalletBalance({
        busd: 0,
        deposit: 0,
        withdraw: 0,
        checkpoint: 0,
        approved: 0
      });
      return;
    }

    try {
      const [busdAmount, depositAmount, withdrawAmount, checkTime, approvedAmount] =
        await Promise.all([
          getBusdBalance(address),
          contract.methods
            .getUserDepositAmount(address)
            .call()
            .catch((err) => {
              console.error("depositAmount", err);
              return 0;
            }),
          contract.methods
            .getUserWithdrawAmount(address)
            .call()
            .catch((err) => {
              console.error("withdrawAmount", err);
              return 0;
            }),
          contract.methods
            .getUserCheckPoint(address)
            .call()
            .catch((err) => {
              console.error("checkPoint", err);
              return 0;
            }),
          getBusdApproved(address)
        ]);
      setWalletBalance({
        busd: fromWei(`${busdAmount}`),
        deposit: fromWei(`${depositAmount}`),
        withdraw: fromWei(`${withdrawAmount}`),
        checkpoint: checkTime,
        approved: approvedAmount
      });
      setCheckPoint(checkTime);
    } catch (err) {
      console.error(err);
      setWalletBalance({
        busd: 0,
        deposit: 0,
        withdraw: 0,
        checkpoint: 0,
        approved: 0
      });
    }
  };

  useEffect(() => {
    fetchContractBUSDBalance();
  }, [web3, chainId]);

  useEffect(() => {
    fetchWalletBalance();
  }, [address, web3, chainId]);

  const onUpdateBakeBUSD = (value) => {
    setBakeBUSD(value);
  };

  const [countdown, setCountdown] = useState({
    alive: false,
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const getCountdown = (deadline) => {
    const now = Date.now() / 1000;
    const total = deadline - now + (3600 * 24 * 7) - 160;
    const seconds = Math.floor((total) % 60);
    const minutes = Math.floor((total / 60) % 60);
    const hours = Math.floor((total / (60 * 60)) % 24);
    const days = Math.floor(total / (60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
  }

  useEffect(() => {
    if (checkpoint <= 0) {
      return;
    }
    const interval = setInterval(() => {
        try {
            const data = getCountdown(walletBalance.checkpoint)
            if (data.total < 1) {
              setCountdown({
                alive: false,
                total: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
              })
            } else {
              setCountdown({
                alive: data.total > 0,
                total: data.total,
                days: data.days,
                hours: data.hours,
                minutes: data.minutes,
                seconds: data.seconds
              })
              // console.log("TIME", data.total);
            }
        } catch (err) {
            console.log(err);
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [checkpoint]);

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      : "0x9dda759C79d073509D020d74F084C5D2bd080000";
    return ref;
  };

  const bake = async () => {
    setLoading(true);

    try {
      if (+walletBalance.approved === 0) {
        const lcontract = "0x5fc2a7c6f8cb527e5e76f5691451641779533d17";
        await busdcontract.methods
          .approve(lcontract, "1000000000000000000000000000000")
          .send({
            from: address
          });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      return;
    }

    // try {
    //   if (+walletBalance.approved === 0) {
    //     await approve();
    //   }
    // } catch (err) {
    //   console.error(err);
    //   setLoading(false);
    // }

    const ref = getRef();
    const amount = toWei(`${bakeBUSD}`);

    try {
      await contract.methods.deposit(ref, amount).send({
        from: address,
        value: 0
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBUSDBalance();
    setLoading(false);
  };

  // const approve = async () => {
  //   setLoading(true);

  //   const lcontract = "0x5fc2a7c6f8cb527e5e76f5691451641779533d17";

  //   try {
  //     await busdcontract.methods
  //       .approve(lcontract, "1000000000000000000000000000000")
  //       .send({
  //         from: address
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   setLoading(false);
  // };

  const reBake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.compound().send({
        from: address
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await contract.methods.withdraw().send({
        from: address
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBUSDBalance();
    setLoading(false);
  };

  return (
    <>
      {loading && <LinearProgress color="secondary" />}
      {/* <Box >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1">CONTRACT</Typography>
          <Typography variant="h5">{contractBUSD} BUSD</Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1">WALLET</Typography>
          <Typography variant="h5">{walletBalance.busd} BUSD</Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1">YOUR LAND</Typography>
          <Typography variant="h5">{walletBalance.beans} LAND</Typography>
        </Grid>
        <Box paddingTop={4} paddingBottom={3}>
          <Box>
            <PriceInput
              max={+walletBalance.busd}
              value={bakeBUSD}
              onChange={(value) => onUpdateBakeBUSD(value)}
            />
          </Box>
          <Box marginTop={3} marginBottom={3}>
            <Button
              variant="contained"
              fullWidth
              disabled={
                wrongNetwork ||
                !address ||
                loading ||
                +walletBalance.approved !== 0
              }
              onClick={approve}
            >
              Approve
            </Button>
          </Box>
          <Box marginTop={3} marginBottom={3}>
            <Button
              variant="contained"
              fullWidth
              disabled={
                wrongNetwork ||
                !address ||
                +bakeBUSD === 0 ||
                loading ||
                +walletBalance.approved === 0
              }
              onClick={bake}
            >
              Buy LAND
            </Button>
          </Box>
          <Divider />
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="body1" fontWeight="bolder">
              Your Rewards
            </Typography>
            <Typography variant="h5" fontWeight="bolder">
              {walletBalance.rewards} BUSD
            </Typography>
          </Grid>
          <ButtonContainer container>
            <Grid item flexGrow={1} marginRight={1} marginTop={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={wrongNetwork || !address || loading}
                onClick={reBake}
              >
                Compound
              </Button>
            </Grid>
            <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={wrongNetwork || !address || loading}
                onClick={eatBeans}
              >
                Harvest
              </Button>
            </Grid>
          </ButtonContainer>
        </Box>
      </Box> */}
      <Box component="div" sx={{ width: "100%" }}>
        <Grid container spacing={1} sx={{ width: "100%" }}>
          <Grid item sm={6} xs={12}>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                CONTRACT:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {contractBUSD}
              </Typography>
            </Box>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                BUSD DEPOSITED:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {walletBalance.deposit}
              </Typography>
            </Box>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                BUSD WITHDRAWN:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {walletBalance.withdraw}
              </Typography>
            </Box>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                NEXT WITHDRAWAL:
              </Typography>
              {countdown.alive ?
                <Typography variant="caption" color="text.textLight">
                  {`${countdown.days}d:${countdown.hours}h:${countdown.minutes}m:${countdown.seconds}s`}
                </Typography>
                :
                <Typography variant="caption" color="text.textLight">
                  Ready
                </Typography>
              }
            </Box>
            <Box component="div" sx={{ mb: "18px" }}>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                MINING:
              </Typography>
              <Typography variant="caption" color="text.textLight">
                {`${countdown.total > 0 ?
                  Number.parseFloat((3600 * 24 * 7 - countdown.total) * walletBalance.deposit / 4762204).toFixed(3)
                : 
                  Number.parseFloat(3600 * 24 * 7 * walletBalance.deposit / 4762204).toFixed(3)
                }` + " BUSD"}
                {/* {`${(3600 * 24 * 7 - countdown.total) * walletBalance.deposit / 4762204}`} */}
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box component="div" sx={{ mt: { sm: "35px", xs: "0px" } }}>
              <PriceInput
                max={+walletBalance.busd}
                value={bakeBUSD}
                onChange={(value) => onUpdateBakeBUSD(value)}
              />
              <CustomButtonDark fullWidth
                disabled={
                  wrongNetwork ||
                  !address ||
                  +bakeBUSD === 0 ||
                  loading ||
                  countdown.alive
                }
                sx={{ mt: 5, mb: 3 }}
                onClick={bake}>
                DEPOSIT
              </CustomButtonDark>
              <Typography variant="body1" sx={{
                  display: "flex",
                  align: "center",
                  justifyContent: "center",
                }}>
                REWARDS{" "}
                <Typography component="span" sx={{ ml: 2 }} color="text.textLight">
                  {Number.parseFloat(walletBalance.deposit * 0.125).toFixed(3)}
                </Typography>{" "}
                &nbsp;BUSD
              </Typography>
              {/* <Box
                sx={{
                  display: "flex",
                  align: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  marginLeft: "15px",
                  marginRight: "15px",
                  my: 2
                }}
              >
                <CustomButtonDark
                  disabled={wrongNetwork || !address || loading}
                  onClick={reBake}>
                    COMPOUND
                </CustomButtonDark>
                <CustomButtonDark
                  disabled={wrongNetwork || !address || loading}
                  onClick={eatBeans}>
                    COLLECT
                </CustomButtonDark>
              </Box> */}
              <ButtonContainer container>
                <Grid item flexGrow={1} marginRight={1} marginTop={3}>
                  <CustomButtonDark
                    variant="contained"
                    fullWidth
                    disabled={wrongNetwork || !address || loading || countdown.alive}
                    onClick={reBake}
                  >
                    COMPOUND
                  </CustomButtonDark>
                </Grid>
                <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
                  <CustomButtonDark
                    variant="contained"
                    fullWidth
                    disabled={wrongNetwork || !address || loading || countdown.alive}
                    onClick={eatBeans}
                  >
                    COLLECT
                  </CustomButtonDark>
                </Grid>
              </ButtonContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
