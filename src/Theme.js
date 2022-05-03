import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f4b52d",
      light: "#f4b52d24"
    },
    secondary: {
      main: "#f4b52d"
    },
    text: {
      primary: "#f4b52d",
      textLight: "#ffffff",
      darkBgColor: "#161718"
    }
  },
  typography: {
    fontFamily: "Roboto",
    body1: {
      fontSize: 20
    },
    body2: {
      fontSize: 16,
      color: "#ffffff"
    },
    allVariants: {
      color: "#f4b52d"
    },
    h4: {
      fontWeight: 600,
      fontSize: 32
    },
    h5: {
      fontSize: 24,
      fontWeight: 500
    },
    h6: {
      fontSize: 24,
      fontWeight: 800,
      color: "#f4b52d"
    },
    caption: {
      fontSize: 18
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "12px 24px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          fontWeight: 400,
          fontSize: "1.2rem",
          padding: "10px",
          minWidth: 138
        }
        // contained: {
        //   boxShadow: "6px 6px 20px 6px #00000096",
        // },
        // containedSecondary: {
        //   color: "#f4b52d",
        // },
      }
    }
  }
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
