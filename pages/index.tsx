import Head from "next/head";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Grid } from "@mui/material";

import { Fuul } from "@fuul/sdk";

import ReferralsInfo from "@/src/components/Referrals/ReferralsInfo";
import ReferralsCopyTrackingLinkUrl from "@/src/components/Referrals/ReferralsCopyTrackingLinkUrl";
import ConversionsListTable from "@/src/components/ConversionListTable/ConversionsListTable";

import { PaymentType } from "@/src/types";
import { ConversionDTO } from "@fuul/sdk/lib/esm/types/infrastructure/conversions/dtos";

export default function TrackingLinkCreationPage() {
  const [conversions, setConversions] = useState<ConversionDTO[]>();

  useEffect(() => {
    const fuul = new Fuul(process.env.NEXT_PUBLIC_FUUL_API_KEY as string, { baseApiUrl: process.env.NEXT_PUBLIC_FUUL_API_URL });

    // Fetch conversions from Fuul API
    fuul.getAllConversions().then((data) => {
      setConversions(data);
    });
  }, []);

  if (!conversions) {
    return <CircularProgress size={20} />;
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
