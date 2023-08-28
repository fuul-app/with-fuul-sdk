import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import ReferralsInfo from "@/src/components/Referrals/ReferralsInfo";
import ReferralsCopyTrackingLinkUrl from "@/src/components/Referrals/ReferralsCopyTrackingLinkUrl";
import ConversionsListTable from "@/src/components/ConversionListTable/ConversionsListTable";

import { PaymentType } from "@/src/types";
import { ConversionDTO } from '@fuul/sdk'

import Fuul from '@fuul/sdk'

export default function TrackingLinkCreationPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [conversions, setConversions] = useState<ConversionDTO[]>();

  useEffect(() => {
    Fuul
      .getAllConversions()
      .then((data) => {
        setConversions(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <CircularProgress size={20} />;
  }

  if (!conversions?.length) {
    return (
      <Typography variant="h4" textAlign="center">
        No conversions yet
      </Typography>
    );
  }

  return (
    <>
      <Head>
        <title>
          Refer your audience to {conversions[0].project.name} and earn rewards
        </title>
        <meta
          name="description"
          content={`Join ${conversions[0].project.name}'s partner program and receive unlimited rewards with each successful referral. Create your own custom referral link and start earning today.`}
        />
      </Head>
      <Box py={5}>
        <Container maxWidth="md">
          <Grid container rowSpacing={5} justifyContent="center">
            <ReferralsInfo conversion={conversions[0]} />
            <ReferralsCopyTrackingLinkUrl conversion={conversions[0]} />
            {conversions && (
              <Grid item xs={12} md={8}>
                <ConversionsListTable
                  conversions={conversions}
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
