const { APIContracts, APIControllers } = require("authorizenet");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { cardNumber, expirationDate, cardCode, amount, billingAddress } =
    req.body;

  // Validate required fields
  if (
    !cardNumber ||
    !expirationDate ||
    !cardCode ||
    !amount ||
    !billingAddress
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const merchantAuthentication = new APIContracts.MerchantAuthenticationType();
  merchantAuthentication.setName(process.env.API_LOGIN_ID);
  merchantAuthentication.setTransactionKey(process.env.API_TRANSACTION_KEY);

  const creditCard = new APIContracts.CreditCardType();
  creditCard.setCardNumber(cardNumber);
  creditCard.setExpirationDate(expirationDate);
  creditCard.setCardCode(cardCode);

  const paymentType = new APIContracts.PaymentType();
  paymentType.setCreditCard(creditCard);

  const billTo = new APIContracts.CustomerAddressType();
  billTo.setFirstName(billingAddress.firstName);
  billTo.setLastName(billingAddress.lastName);
  billTo.setAddress(billingAddress.address);
  billTo.setCity(billingAddress.city);
  billTo.setState(billingAddress.state);
  billTo.setZip(billingAddress.zip);
  billTo.setCountry(billingAddress.country);

  const transactionRequest = new APIContracts.TransactionRequestType();
  transactionRequest.setTransactionType(
    APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
  );
  transactionRequest.setPayment(paymentType);
  transactionRequest.setAmount(amount);
  transactionRequest.setCurrencyCode("USD");
  transactionRequest.setBillTo(billTo);

  const createRequest = new APIContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(merchantAuthentication);
  createRequest.setTransactionRequest(transactionRequest);

  const controller = new APIControllers.CreateTransactionController(
    createRequest.getJSON()
  );

  try {
    await controller.execute();
    const apiResponse = controller.getResponse();

    console.log("apiResponse", apiResponse);

    if (!apiResponse) {
      return res.status(500).json({
        error: "Transaction failed",
        details: "Null response from API",
      });
    }

    const response = new APIContracts.CreateTransactionResponse(apiResponse);

    if (
      response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK
    ) {
      const transactionResponse = response.getTransactionResponse();
      if (transactionResponse && transactionResponse.getMessages()) {
        return res.status(200).json({
          transactionId: transactionResponse.getTransId(),
          message: transactionResponse
            .getMessages()
            .getMessage()[0]
            .getDescription(),
        });
      } else {
        const errorText =
          transactionResponse?.getErrors()?.getError()[0]?.getErrorText() ||
          "Unknown error";
        return res
          .status(400)
          .json({ error: "Transaction failed", details: errorText });
      }
    } else {
      const errorText = response.getMessages().getMessage()[0].getText();
      return res
        .status(400)
        .json({ error: "Transaction failed", details: errorText });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });
  }
}
