import PAYMENT_TYPES from "src/constants/PAYMENT_TYPES";

const calculateAmountByPaymentTypes = (client, paymentTypes = []) => {
  return (client.orders || []).reduce((acc, order) => (paymentTypes.includes(order.paymentType) ? acc + order.amount : acc), 0);
};

const clientWorthMethods = (client) => {
  const getAmountByPaymenTypes = (paymentTypes) => () => calculateAmountByPaymentTypes(client, paymentTypes);

  const getNewOrderAmount = getAmountByPaymenTypes([PAYMENT_TYPES.NEW_ORDER]);

  const getUpsellAmount = getAmountByPaymenTypes([PAYMENT_TYPES.UPSALE]);

  const getRepaidAmount = getAmountByPaymenTypes([PAYMENT_TYPES.REPAID]);

  const getChargebackAmount = getAmountByPaymenTypes([PAYMENT_TYPES.CHARGEBACK]);

  const getPartialChargebackAmount = getAmountByPaymenTypes([PAYMENT_TYPES.PARTIAL_CHARGEBACK]);

  const getRefundAmount = getAmountByPaymenTypes([PAYMENT_TYPES.REFUND]);

  const getPartialRefundAmount = getAmountByPaymenTypes([PAYMENT_TYPES.PARTIAL_REFUND]);

  const getNewOrderAndUpSellAmount = getAmountByPaymenTypes([PAYMENT_TYPES.NEW_ORDER, PAYMENT_TYPES.UPSALE]);

  const getChargebackAndRefundAmount = getAmountByPaymenTypes([PAYMENT_TYPES.CHARGEBACK, PAYMENT_TYPES.REFUND]);

  const getPartialChargebackAndPartialRefundAmount = getAmountByPaymenTypes([PAYMENT_TYPES.PARTIAL_CHARGEBACK, PAYMENT_TYPES.PARTIAL_REFUND]);

  const getClientPartialChargebackAmount = () => (!["chargeback", "refunded"].includes(client.status.title) ? getChargebackAmount() + getPartialChargebackAmount() : 0);

  const getClientPartialRefundAmount = () => (!["chargeback", "refunded"].includes(client.status.title) ? getRefundAmount() + getPartialRefundAmount() : 0);

  const getClientPartialChargebackAndPartialRefundAmount = () => getClientPartialChargebackAmount() + getClientPartialRefundAmount();

  const getClientWorth = () => {
    if (["chargeback", "refunded"].includes(client.status.title)) {
      return getChargebackAndRefundAmount() + getPartialChargebackAndPartialRefundAmount();
    }

    return getNewOrderAndUpSellAmount() + getRepaidAmount() - getChargebackAndRefundAmount() + getPartialChargebackAndPartialRefundAmount();
  };

  return {
    getNewOrderAmount,
    getUpsellAmount,
    getRepaidAmount,
    getChargebackAmount,
    getPartialChargebackAmount,
    getRefundAmount,
    getPartialRefundAmount,
    getNewOrderAndUpSellAmount,
    getChargebackAndRefundAmount,
    getPartialChargebackAndPartialRefundAmount,
    getClientPartialChargebackAmount,
    getClientPartialRefundAmount,
    getClientPartialChargebackAndPartialRefundAmount,
    getClientWorth,
  };
};

export default clientWorthMethods;
