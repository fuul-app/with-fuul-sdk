import { useEffect, useState } from "react";
import { Fuul } from "@fuul/sdk";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { PaymentType } from "@/src/types";
import Head from "next/head";
import ConversionsListTable from "@/src/components/ConversionListTable/ConversionsListTable";
import ConnectWalletCard from "@/src/components/Tracking/ConnectWalletCard";
import { ConversionDTO } from "@fuul/sdk/lib/esm/types/infrastructure/conversions/dtos";

const TrackingPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [conversions, setConversions] = useState<ConversionDTO[]>();

  useEffect(() => {
    const fuul = new Fuul(process.env.NEXT_PUBLIC_FUUL_API_KEY as string);

    fuul
      .getAllConversions()
      .then((data) => {
        setConversions(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <CircularProgress size={20} />;

  if (!conversions)
    return (
      <Typography variant="body1">
        No conversions found for this project
      </Typography>
    );

  return (
    <>
      <Head>
        <title>You have been referred to {conversions[0].project.name}</title>
        <meta
          name="description"
          content={`Accept your invitation to ${conversions[0].project.name} and claim any rewards, if eligible, on your future transactions.`}
        />
      </Head>
      <Box py={5}>
        <Container maxWidth="md">
          <Grid container rowSpacing={5} justifyContent="center">
            <ConnectWalletCard conversion={conversions[0]} />
            <Grid item xs={12} md={8}>
              <ConversionsListTable
                conversions={conversions}
                paymentType={PaymentType.END_USER}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default TrackingPage;
