import { useCallback, useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

import { Fuul } from "@fuul/sdk";

import { CampaignDTO } from "@fuul/sdk/lib/esm/types/infrastructure/campaigns/dtos";

interface Props {
  campaign: CampaignDTO;
}

const ReferralsCopyTrackingLinkUrl = ({ campaign }: Props) => {
  const [copiedValue, setCopiedValue] = useState<string>("");
  const fuul = new Fuul(process.env.NEXT_PUBLIC_FUUL_API_KEY as string);

  const trackingLinkUrl = fuul.generateTrackingLink({
    // Here you can use your own to create a custom tracking link, for example in our case we will create /tracking page
    baseUrl: `${window.location.origin}/tracking`,

    // Here you should use the address of the user that will be the referrer
    address: "0x0000000",

    pid: campaign.project.id,
  });

  const onCopy = useCallback((value: string) => {
    setCopiedValue(value);
  }, []);

  return (
    <>
      <Grid item xs={12} md={8}>
        <Card sx={{ padding: "12px", borderRadius: "10px" }}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <CopyToClipboard onCopy={onCopy} text={trackingLinkUrl}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    cursor: "pointer",
                  }}
                >
                  {trackingLinkUrl}
                </Typography>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
              <CopyToClipboard onCopy={onCopy} text={trackingLinkUrl}>
                <Button
                  size="small"
                  sx={{
                    textTransform: "capitalize",
                    display: "flex",
                    gap: "4px",
                    marginLeft: "auto",
                    color: "#575cfe",
                  }}
                >
                  {copiedValue ? (
                    <CheckIcon color="primary" />
                  ) : (
                    <ContentCopyIcon color="primary" />
                  )}
                </Button>
              </CopyToClipboard>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="body2" sx={{ color: "common.gray.light" }}>
          Your custom referral link is created once and is yours to keep - no
          need to generate a new link for every new user you want to refer
        </Typography>
      </Grid>
    </>
  );
};

export default ReferralsCopyTrackingLinkUrl;
