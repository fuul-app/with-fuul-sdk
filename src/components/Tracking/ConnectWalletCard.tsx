import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Fuul from "@fuul/sdk";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useAccount, useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils.js";
import { ConversionDTO } from "@fuul/sdk/dist/infrastructure/conversions/dtos";

const ACCEPT_REFERRAL_MESSAGE = `Accept referral at: ${new Date().toISOString()}`;

interface Props {
  conversion: ConversionDTO;
}

const ConnectWalletCard = ({ conversion }: Props): JSX.Element => {
  const [connectedAddress, setConnectedAddress] = useState<string>();

  const fuul = new Fuul(process.env.NEXT_PUBLIC_FUUL_API_KEY as string, { baseApiUrl: process.env.NEXT_PUBLIC_FUUL_API_URL });

  const { signMessageAsync } = useSignMessage({
    onSuccess(signature, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, signature);

      if (address !== connectedAddress) {
        window.alert("Invalid signature");
      } else {
        fuul.sendEvent("connect_wallet", {}, {
          userAddress: connectedAddress,
          signature,
          signatureMessage: variables.message as string,
        });
      }
    },
  });

  useAccount({
    async onConnect({ address }) {
      setConnectedAddress(address);

      await signMessageAsync({
        message: ACCEPT_REFERRAL_MESSAGE,
      });
    },
  });

  return (
    <>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h4" textAlign="center" marginBottom="8px">
              Join {conversion?.project.name} referral program!{" "}
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              How it works
            </Typography>
            <Box
              textAlign="left"
              marginBottom="24px"
              display="flex"
              flexDirection="column"
              gap="0.5rem"
            >
              <Typography variant="body1">
                1. Connect your wallet to become eligible for rewards on your
                future transactions
              </Typography>
              <Typography variant="body1">
                2. To effectively join, you must sign a message (no fee, no key
                access) with your wallet to verify that you are eligible.
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                sx={{
                  marginTop: "2rem",
                }}
              >
                <ConnectButton label="Connect wallet" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ConnectWalletCard;
