import { CampaignDTO } from "@fuul/sdk/lib/esm/types/infrastructure/campaigns/dtos";
import { Avatar, Grid, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
  campaign: CampaignDTO;
}

const ReferralsInfo = ({ campaign }: Props) => {
  return (
    <>
      <Grid item xs={12} md={8} display="flex" justifyContent="center">
        <Avatar
          sx={{
            width: "75px",
            height: "75px",
          }}
        >
          <Image
            src={campaign.project.thumbnail_url}
            alt={campaign.project.thumbnail_url}
            width={75}
            height={75}
          />
        </Avatar>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" textAlign="center">
          Refer others to try {campaign.project.name}
        </Typography>
      </Grid>
      {campaign.referrer_excerpt && (
        <Grid item xs={12} md={8}>
          <Typography variant="body1" textAlign="center">
            {campaign.referrer_excerpt}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} md={8}>
        <Typography variant="body1" textAlign="center">
          Your own custom referral link
        </Typography>
      </Grid>
    </>
  );
};

export default ReferralsInfo;
