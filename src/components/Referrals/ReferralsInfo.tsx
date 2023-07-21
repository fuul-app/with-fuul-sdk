import { ConversionDTO } from "@fuul/sdk/dist/infrastructure/conversions/dtos";
import { Avatar, Grid, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
  conversion: ConversionDTO;
}

const ReferralsInfo = ({ conversion }: Props) => {
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
            src={conversion.project.thumbnail_url}
            alt={conversion.project.thumbnail_url}
            width={75}
            height={75}
          />
        </Avatar>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" textAlign="center">
          Refer others to try {conversion.project.name}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="body1" textAlign="center">
          Your own custom referral link
        </Typography>
      </Grid>
    </>
  );
};

export default ReferralsInfo;
