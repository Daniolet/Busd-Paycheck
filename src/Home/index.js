import { styled } from "@mui/system";

import Connect from "./components/Connect";
import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import NutritionFacts from "./components/NutritionFacts";
// import ReferralLink from "./components/ReferralLink";
import { useAuthContext } from "../providers/AuthProvider";
import Footer from "./components/Footer";
// import FAQs from "./components/FAQ";
import FAQNew from "./components/FAQNew";

const Wrapper = styled("div")(({ theme }) => ({
  maxWidth: 680,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%"
  }
}));

export default function Home() {
  const { address } = useAuthContext();

  return (
    <Wrapper>
      <Header />
      <Connect />
      <BakeCard />
      <NutritionFacts address={address} />
      {/* <ReferralLink address={address} /> */}
      <FAQNew />
      {/* <FAQs /> */}
      <Footer />
    </Wrapper>
  );
}
