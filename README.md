# Using Fuul SDK Library

This guide will walk you through how to use Fuul SDK library within a Next.js application to build a two-page app that lists conversions and allows users to create tracking links.

Please note that Fuul's SDK can be used in any JavaScript application, not only in Next.js. You can see the full documentation for the SDK library [here](https://docs.fuul.xyz/technical-guide-for-projects/building-a-partner-onboarding-page-using-the-fuul-sdk).

## Installation

1. Clone the repository

2. Copy the `.env.example` file into `.env`

You'll need to provide a production API Key for the Fuul SDK to be able to connect to your project and query information from it.

3. Install project dependencies

```bash
$ npm i
```

4. Start the server

```bash
$ npm start dev
```

You can then go to [http://localhost:3000]

## Structure of the App

In our example we will have two pages:

* Referrer onboarding page (index.tsx): Lists conversions and allows referrers to create tracking links
  
* `tracking.tsx` - the page that will be used to track connect_wallet events and pageviews

### Referrer onboarding page `(index.tsx)`

To create the first page that lists conversions, create a new page (in our case we will use `index.tsx`) and import Fuul SDK library. You can use the following code as a starting point:

```tsx
import React from "react";
import { Fuul } from "@fuul/sdk";

const TrackingLinkCreationPage = () => {
  const fuul = new Fuul("<your-api-key>");
  const [conversions, setConversions] = useState();

  useEffect(() => {
    fuul.getAllConversions().then((data) => {
      setConversions(data);
    });
  }, []);
};

export default ListConversionsPage;
```

Here we are fetching the list of all conversions related to the project based on the api-key you’ve entered.

Then we simply map through the conversions and render a list as you can see in `src/components/ConversionListTable/ConversionsListTable.tsx` file on this repository.

One important thing to note is that in our API, we have two “payment types”:

- `referrer_amount` which is the amount that the referrer will receive when a trigger is executed.
- `referral_amount` which is the amount that the user will receive as incentive for triggering such on-chain event.

In this page you should emphasize on the `referrer_amount` and make clear to the referrer how much it will be paid for each conversion

![Referrer amount image](/public/referrer_amount.png)

### Creating a Tracking Link

You can refer to `src/components/Referrals/ReferralsCopyTrackingLinkUrl.tsx` to see how to create a tracking link but basically what we need to do is the following:

- One important thing to note here is that we’re setting the `baseUrl` property to `/tracking` since we need the end users land on that page to track conversions, but you could name this page whatever you want, just remember to point it correctly here.
- Address should be taken from the current wallet connected

```tsx
const trackingLinkUrl = fuul.generateTrackingLink({
   // Here you can use your own to create a custom tracking link, for example in our case we will create /tracking page
   baseUrl: `${window.location.origin}/tracking`,
   // Here you should use the address of the user that will be the referrer
   address: "0x0000000",
   // Id of the project you want to refer
   pid: conversion.project.id,
});
```

### User onboarding page `(tracking.tsx)`

This page is the one that will be used to track events (such as `connect_wallet` and `pageview`)

The process to retrieve the list of conversions is pretty much the same as we did before, but here we need to emphasize on the payment type `referral_amount`

![Referral amount image](/public/referral_amount.png)

## 3. Sending events

### connect_wallet

Once end user lands on the `tracking` page, Fuul’s SDK will automatically send a `pageview` event so you don’t need to perform any action on your side.

But there’s another important event that needs to be manually sent and it’s `connect_wallet`.

You can take a look at the implementation in `src/components/Tracking/ConnectWalletCard.tsx` but basically what we need to do is once the user connects it’s wallet and signs the message:

```tsx
const { signMessageAsync } = useSignMessage({
  onSuccess(signature, variables) {
    // Verify signature when sign message succeeds
    const address = verifyMessage(variables.message, signature);

    if (address !== connectedAddress) {
      window.alert("Invalid signature");
    } else {
      fuul.sendEvent("connect_wallet", {}, {
        address: connectedAddress,
        message: signature,
        signatureMessage: variables.message,
      });
    }
  },
});
```

Please bear in mind that you need to verify the signature before sending the event to Fuul’s API. Otherwise you will be sending invalid events.
