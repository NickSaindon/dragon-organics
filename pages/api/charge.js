// pages/api/charge.js
const { APIContracts, APIControllers, Constants } = require("authorizenet");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { cardNumber, expirationDate, cardCode, amount, billingAddress } =
    req.body;

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

  const transactionRequest = new APIContracts.TransactionRequestType();
  transactionRequest.setTransactionType(
    APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
  );
  transactionRequest.setPayment(paymentType);
  transactionRequest.setAmount(amount);
  transactionRequest.setCurrencyCode("USD");

  const createRequest = new APIContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(merchantAuthentication);
  createRequest.setTransactionRequest(transactionRequest);

  const controller = new APIControllers.CreateTransactionController(
    createRequest.getJSON()
  );

  // 👇 Use environment variable to determine sandbox or production
  if (process.env.AUTHORIZE_NET_ENV === "production") {
    controller.setEnvironment(Constants.endpoint.production);
  } else {
    controller.setEnvironment(Constants.endpoint.sandbox);
  }

  try {
    const response = await new Promise((resolve, reject) => {
      controller.execute(() => {
        const apiResponse = controller.getResponse();
        if (!apiResponse) return reject(new Error("Null response from API"));

        try {
          const parsedResponse = new APIContracts.CreateTransactionResponse(
            apiResponse
          );
          resolve(parsedResponse);
        } catch (err) {
          reject(err);
        }
      });
    });

    if (
      response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK
    ) {
      const transactionResponse = response.getTransactionResponse();
      return res.status(200).json({
        transactionId: transactionResponse.getTransId(),
        message: transactionResponse
          .getMessages()
          .getMessage()[0]
          .getDescription(),
      });
    } else {
      return res.status(400).json({
        error: "Transaction failed",
        details: response.getMessages().getMessage()[0].getText(),
      });
    }
  } catch (error) {
    console.error("Transaction Error:", error);
    return res.status(500).json({
      error: "Transaction failed",
      details: error.message,
    });
  }
}
