import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FAQNew = () => {
  return (
    <Box component="div" sx={{ width: "100%", py: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "400" }} gutterBottom>
            WORLDS FIRST AUTOMINER<br/>EARN 12.7% WEEKLY
          </Typography>
          <Box component="ol" sx={{ color: "text.textLight"}}>
            <Box component="li">
              <Typography variant="body2">Earn 12.7% Weekly</Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                Minimum Deposit of 10 BUSD maximum 10,000 BUSD
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                Reward payouts are once every 7 days
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                7-day timer starts on each deposit, compound, or withdraw
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                You can only deposit compound or withdraw when the 7-day timer is not active
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                Users can share the referral link to earn an additional bonus<br/>
                (a minimum 10 BUSD deposit is required to activate the link)
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "400" }} gutterBottom>
            TOKENOMICS
          </Typography>
          <Box component="ul" sx={{ color: "text.textLight" }}>
            <Box component="li">
              <Typography variant="body2">Earn 12.7% Weekly</Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                Every deposite/withdrawal has a base tax of 5%
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                There is a 5% referral commission
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                Rewards can be reinvested (compound) or withdrawn (collect) every 7 days
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                The 7-day timer earns you a constant 12.7% of your total deposits
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">No tax on compound</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "400" }} gutterBottom>
            REFERRAL SYSTEM
          </Typography>
          <Typography variant="body2">
            The contract pays a 5 % referral commission over one level
          </Typography>
          <Box component="ul" sx={{ color: "text.textLight" }}>
            <Box component="li">
              <Typography variant="body2">
                Referral rewards are available instantly and separately from
                your deposits
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                Referral rewards are tax - free
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                Users can not use their wallet as a referral for themselves
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "400" }} gutterBottom>
            ANTI WHALE MEASURES
          </Typography>
          <Box component="ul" sx={{ color: "text.textLight" }}>
            <Box component="li">
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                Maximum deposit of 10,000 BUSD
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                After the 7-day timer is up you will no longer earn any additional rewards 
                until you make a new action (compound, deposit, or withdraw). 
                Once the new action is triggered the timer will restart. 
                This prevents anyone from saving rewards for several weeks and withdrawing a large lump sum.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "400" }} gutterBottom>
            HOW ARE WE DIFFERENT
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "justify" }}>
            This is the world's first auto mining system where you can create
            your weekly income. Make a deposit and earn passive income every 7
            days. This project is immutable and once released can not be
            changed.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "400" }} gutterBottom>
            ABOUT THE EXPERIMENT
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "justify" }}>
            This is an experiment created by an anonymous DeFi experienced
            person. Inspired by the 6/1 strategy where you compound your daily
            rewards once a day for 6 days and collect your rewards on the 7th
            day at a rate of 8% per day maximum daily rewards. On the 7th day,
            you would collect your pending rewards which would equal 12.7% of
            your initial investment. This auto miner will save you time and
            gas fees and earn you the maximum weekly rewards every week. The
            purpose of the experiment is for a profitable self-sustaining
            project run by the people. The project will end if and when the
            people no longer take part in the experiment. This is the purest
            form of a fair launch giving every participant an equal place
            within the project. The project is Audited and verified to ensure
            its authenticity. Once the project is launched it is irreversible
            and out of the hands of the developer.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "400" }} gutterBottom>
            PROJECT UPDATES
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "justify" }}>
            The Anonymous Project will have a telegram channel where the community
            will be able to talk, share any strategies, and ideas for future projects.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "400" }} gutterBottom>
            PLEASE NOTE
          </Typography>
          <Box component="ul" sx={{ color: "text.textLight" }}>
            <Box component="li">
              <Typography variant="body2">
                When making new deposits any pending rewards will auto compound
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                It is encouraged to make a new deposit at least once every two months 
                of an equal or higher value than your original deposit for the best 
                sustainable results
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body2">
                You can not unstake; only withdraw earnings
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FAQNew;
