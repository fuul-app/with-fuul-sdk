import { Card, CardContent, Typography } from "@mui/material";

import ConversionListItem from "@/src/components/ConversionListTable/ConversionListItem";

import { ConversionDTO } from "@fuul/sdk/lib/esm/types/infrastructure/campaigns/dtos";
import { PaymentType } from "@/src/types";

interface Props {
  paymentType: PaymentType;
  conversions: ConversionDTO[];
}

const ConversionsListTable = ({
  paymentType,
  conversions,
}: Props): JSX.Element => {
  if (!conversions) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body2">
            No conversions created yet in this campaign
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const title = {
    [PaymentType.END_USER]: "Events that get you rewarded",
    [PaymentType.REFERRER]: "Events that get you rewarded",
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {title[paymentType]}
        </Typography>
        {conversions.map((conversion) => (
          <ConversionListItem
            key={conversion.id}
            conversion={conversion}
            paymentType={paymentType}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ConversionsListTable;
