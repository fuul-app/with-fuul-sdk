import { Card, CardContent, Typography } from "@mui/material";

import ConversionListItem from "@/src/components/ConversionListTable/ConversionListItem";

import { PaymentType } from "@/src/types";
import { ConversionDTO } from "@fuul/sdk/dist/infrastructure/conversions/dtos";

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

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          Conversions
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
