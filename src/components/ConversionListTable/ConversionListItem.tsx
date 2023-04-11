import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { ConversionDTO } from "@fuul/sdk/lib/esm/types/infrastructure/campaigns/dtos";
import { formatDecimalAmount } from "@/src/utils/format";
import { PaymentType } from "@/src/types";

interface Props {
  conversion: ConversionDTO;
  paymentType: PaymentType;
}

const CircleAdornment = (): JSX.Element => (
  <Box
    sx={{
      width: "8px",
      height: "8px",
      borderRadius: "100%",
      backgroundColor: "lightgray",
    }}
  ></Box>
);

const ConversionListItem = ({
  conversion,
  paymentType,
}: Props): JSX.Element => {
  const getRewardText = (): string => {
    const paymentAmount = conversion[paymentType];

    return `${formatDecimalAmount(paymentAmount)} ${
      conversion.payment_currency
    }`;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap="8px"
      sx={{
        borderBottom: "1px solid #CACBCD",
        padding: "20px 0",
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {getRewardText()}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        pt="12px"
        gap="32px"
        flexWrap="wrap"
      >
        <Box display="flex" alignItems="center" gap="8px">
          <CircleAdornment />
          <Typography variant="body2">
            Event: {conversion?.triggers?.[0].name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="8px">
          <CircleAdornment />
          <Typography variant="body2">
            Description: {conversion?.triggers?.[0].description}
          </Typography>
        </Box>
        {conversion?.triggers?.[0].contracts?.map((contract) => (
          <Box key={contract.address}>
            <Typography>Contract network: {contract.network}</Typography>
            <Typography>Contract address: {contract.address}</Typography>
          </Box>
        ))}
      </Box>
      {paymentType === PaymentType.REFERRER &&
        conversion.referral_amount > 0 && (
          <Box
            display="flex"
            alignItems="center"
            gap="12px"
            sx={{
              backgroundColor: "#F2F2F2",
              borderRadius: "10px",
              padding: "10px",
              marginTop: "8px",
            }}
          >
            <CheckCircleOutlineIcon fontSize="small" color="primary" />
            <Typography variant="body2">
              The user you refer will also get{" "}
              <Typography variant="body2" component="span" fontWeight="bold">
                {formatDecimalAmount(conversion.referral_amount)}{" "}
                {conversion.payment_currency}
              </Typography>
            </Typography>
          </Box>
        )}
    </Box>
  );
};

export default ConversionListItem;
