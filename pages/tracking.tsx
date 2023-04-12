import { useEffect, useState } from "react";
import { Fuul } from "@fuul/sdk";
import { Box, CircularProgress, Container, Grid } from "@mui/material";

import {
  CampaignDTO,
  ConversionDTO,
} from "@fuul/sdk/lib/esm/types/infrastructure/campaigns/dtos";
import { PaymentType } from "@/src/types";
import Head from "next/head";
import ConversionsListTable from "@/src/components/ConversionListTable/ConversionsListTable";
import ConnectWalletCard from "@/src/components/Tracking/ConnectWalletCard";

const TrackingPage = (): JSX.Element => {
  const fuul = new Fuul(process.env.NEXT_PUBLIC_FUUL_API_KEY as string);
  const [campaigns, setCampaigns] = useState<CampaignDTO[]>();

  useEffect(() => {
    fuul.getAllCampaigns().then((data) => {
      setCampaigns(data);
    });
  }, []);

  if (!campaigns) return <CircularProgress size={20} />;

  const conversionsWithRewards: ConversionDTO[] = [];

  campaigns.forEach((campaign) => {
    campaign.conversions?.forEach((conversion: ConversionDTO) => {
      if (conversion[PaymentType.END_USER]) {
        conversionsWithRewards.push(conversion);
      }
    });
  });

  return (
    <>
      <Head>
        <title>You have been referred to {campaigns[0].project.name}</title>
        <meta
          name="description"
          content={`Accept your invitation to ${campaigns[0].project.name} and claim any rewards, if eligible, on your future transactions.`}
        />
      </Head>
      <Box py={5}>
        <Container maxWidth="md">
          <Grid container rowSpacing={5} justifyContent="center">
            <ConnectWalletCard campaign={campaigns[0]} />
            {conversionsWithRewards && (
              <Grid item xs={12} md={8}>
                <ConversionsListTable
                  conversions={conversionsWithRewards}
                  paymentType={PaymentType.END_USER}
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default TrackingPage;
