import Head from "next/head";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Grid } from "@mui/material";

import { Fuul } from "@fuul/sdk";

import ReferralsInfo from "@/components/tracking/ReferralsInfo";
import ReferralsCopyTrackingLinkUrl from "@/components/tracking/ReferralsCopyTrackingLinkUrl";

import { CampaignDTO } from "@fuul/sdk/lib/esm/types/infrastructure/campaigns/dtos";

export default function TrackingLinkCreationPage() {
  const [campaigns, setCampaigns] = useState<CampaignDTO[]>();

  // Initialize Fuul SDK with the API key (remember to store it in a .env file in production)
  const fuul = new Fuul(process.env.NEXT_PUBLIC_FUUL_API_KEY as string);

  useEffect(() => {
    // Fetch the campaigns for the given project from the Fuul API
    fuul.getAllCampaigns().then((data) => {
      setCampaigns(data);
    });
  }, []);

  if (!campaigns) return <CircularProgress size={20} />;

  return (
    <>
      <Head>
        <title>
          Refer your audience to {campaigns?.[0].project.name} and earn rewards
        </title>
        <meta
          name="description"
          content={`Join ${campaigns?.[0].project.name}'s partner program and receive unlimited rewards with each successful referral. Create your own custom referral link and start earning today.`}
        />
      </Head>
      <Box py={5}>
        <Container maxWidth="md">
          <Grid container rowSpacing={5} justifyContent="center">
            <ReferralsInfo campaign={campaigns?.[0]} />
            <ReferralsCopyTrackingLinkUrl campaign={campaigns?.[0]} />
          </Grid>
        </Container>
      </Box>
    </>
  );
}
