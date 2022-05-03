import Button from "@mui/material/Button";
import { styled } from "@mui/system";

import { useAuthContext } from "../../providers/AuthProvider";

const ConnectButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.textLight,
  borderColor: theme.palette.text.textLight,
  backgroundColor: theme.palette.text.darkBgColor,
  position: "fixed",
  right: 48,
  top: 48,
  "&:disabled": {
    color: theme.palette.text.darkBgColor,
    borderColor: theme.palette.text.textLight,
    backgroundColor: "#46494C"
  },
  '&:hover,&:focus': {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.text.textLight,
    boxShadow: 'none',
  },
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

const SmallScreenConnectButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.textLight,
  borderColor: theme.palette.text.textLight,
  backgroundColor: theme.palette.text.darkBgColor,
  display: "none",
  marginTop: 30,
  marginBottom: 18,
  width: "95%",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("md")]: {
    display: "block"
  }
}));

export default function Connect({ responsive = true}) {
  const { address, loading, connect, disconnect } = useAuthContext();

  return responsive ? (
    <ConnectButton
      variant="outlined"
      disabled={loading}
      onClick={() => (address ? disconnect() : connect())}
    >
      {address ? "Disconnect" : "Connect"}
    </ConnectButton>
  ) : (
    <SmallScreenConnectButton
      variant="outlined"
      disabled={loading}
      onClick={() => (address ? disconnect() : connect())}
    >
      {address ? "Disconnect" : "Connect"}
    </SmallScreenConnectButton>
  );
}
