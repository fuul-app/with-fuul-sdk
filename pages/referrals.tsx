import Head from "next/head";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Grid } from "@mui/material";

import { Fuul } from "@fuul/sdk";

import ReferralsInfo from "@/src/components/Referrals/ReferralsInfo";
import ReferralsCopyTrackingLinkUrl from "@/src/components/Referrals/ReferralsCopyTrackingLinkUrl";
import ConversionsListTable from "@/src/components/ConversionListTable/ConversionsListTable";

import {
  CampaignDTO,
  ConversionDTO,
} from "@fuul/sdk/lib/esm/types/infrastructure/campaigns/dtos";
import { PaymentType } from "@/src/types";

export default function TrackingLinkCreationPage() {
  const [campaigns, setCampaigns] = useState<CampaignDTO[]>();

  // Initialize Fuul SDK with your API key (remember to store it in a .env file in production)
  const fuul = new Fuul(process.env.NEXT_PUBLIC_FUUL_API_KEY as string);

  useEffect(() => {
    // Fetch campaigns from Fuul API
    fuul.getAllCampaigns().then((data) => {
      setCampaigns(data);
    });
  }, []);

  if (!campaigns) return <CircularProgress size={20} />;

  // Filter out the conversions that have a referrer reward
  const conversionsWithRewards: ConversionDTO[] = [];

  campaigns.forEach((campaign) => {
    campaign.conversions?.forEach((conversion: ConversionDTO) => {
      if (conversion[PaymentType.REFERRER]) {
        conversionsWithRewards.push(conversion);
      }
    });
  });

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
            {conversionsWithRewards && (
              <Grid item xs={12} md={8}>
                <ConversionsListTable
                  conversions={conversionsWithRewards}
                  paymentType={PaymentType.REFERRER}
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
