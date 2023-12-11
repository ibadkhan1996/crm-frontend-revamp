import PAYMENT_TYPES from "src/constants/PAYMENT_TYPES";

const clientWorthMethods = (client) => {
  const getClientWorth = () => {
    if (["chargeback", "refunded"].includes(client.status.title)) {
      const paymentTypes = [PAYMENT_TYPES.CHARGEBACK, PAYMENT_TYPES.PARTIAL_CHARGEBACK, PAYMENT_TYPES.REFUND, PAYMENT_TYPES.PARTIAL_REFUND];

      return client.orders.reduce((pv, o) => (paymentTypes.includes(o.paymentType) ? pv + o.amount : pv), 0);
    }

    return client.orders.reduce((pv, o) => {
      if ([PAYMENT_TYPES.NEW_ORDER, PAYMENT_TYPES.UPSALE, PAYMENT_TYPES.REPAID].includes(o.paymentType)) {
        return pv + o.amount;
      }
      if ([PAYMENT_TYPES.CHARGEBACK, PAYMENT_TYPES.PARTIAL_CHARGEBACK, PAYMENT_TYPES.REFUND, PAYMENT_TYPES.PARTIAL_REFUND].includes(o.paymentType)) {
        return pv - o.amount;
      }

      return pv;
    }, 0);
  };

  const getAllClientsWorth = (clients = [], status) => {
    return clients.reduce((acc, client) => {
      if (["chargeback", "refunded"].includes(status)) {
        const paymentTypes = [PAYMENT_TYPES.CHARGEBACK, PAYMENT_TYPES.PARTIAL_CHARGEBACK, PAYMENT_TYPES.REFUND, PAYMENT_TYPES.PARTIAL_REFUND];

        return acc + client.orders.reduce((pv, o) => (paymentTypes.includes(o.paymentType) ? pv + o.amount : pv), 0);
      }

      return (
        acc +
        client.orders.reduce((pv, o) => {
          if ([PAYMENT_TYPES.NEW_ORDER, PAYMENT_TYPES.UPSALE, PAYMENT_TYPES.REPAID].includes(o.paymentType)) {
            return pv + o.amount;
          }
          if ([PAYMENT_TYPES.CHARGEBACK, PAYMENT_TYPES.PARTIAL_CHARGEBACK, PAYMENT_TYPES.REFUND, PAYMENT_TYPES.PARTIAL_REFUND].includes(o.paymentType)) {
            return pv - o.amount;
          }

          return pv;
        }, 0)
      );
    }, 0);
  };

  const getfirstOrderAmount = () => {
    return !client?.orders.length ? 0 : client.orders[0].amount;
  };

  const getNewOrderAndUpSellAmount = () => {
    return client.orders.reduce((pv, o) => ([PAYMENT_TYPES.NEW_ORDER, PAYMENT_TYPES.UPSALE].includes(o.paymentType) ? pv + o.amount : pv), 0);
  };

  const getRepaidAmount = () => {
    return client.orders.reduce((pv, o) => ([PAYMENT_TYPES.REPAID].includes(o.paymentType) ? pv + o.amount : pv), 0);
  };

  const getChargebackAmount = () => {
    return client.orders.reduce((pv, o) => ([PAYMENT_TYPES.CHARGEBACK].includes(o.paymentType) ? pv + o.amount : pv), 0);
  };

  const getPartialChargebackAmount = () => {
    return client.orders.reduce((pv, o) => ([PAYMENT_TYPES.PARTIAL_CHARGEBACK].includes(o.paymentType) ? pv + o.amount : pv), 0);
  };

  const getRefundAmount = () => {
    return client.orders.reduce((pv, o) => ([PAYMENT_TYPES.REFUND].includes(o.paymentType) ? pv + o.amount : pv), 0);
  };

  const getPartialRefundAmount = () => {
    return client.orders.reduce((pv, o) => ([PAYMENT_TYPES.PARTIAL_REFUND].includes(o.paymentType) ? pv + o.amount : pv), 0);
  };

  const getClientPartialChargebackAmount = () => {
    if (!["chargeback", "refunded"].includes(client.status.title)) {
      return client.orders.reduce((pv, o) => ([PAYMENT_TYPES.CHARGEBACK, PAYMENT_TYPES.PARTIAL_CHARGEBACK].includes(o.paymentType) ? pv + o.amount : pv), 0);
    } else {
      return 0;
    }
  };

  const getClientPartialRefundAmount = () => {
    if (!["chargeback", "refunded"].includes(client.status.title)) {
      return client.orders.reduce((pv, o) => ([PAYMENT_TYPES.REFUND, PAYMENT_TYPES.PARTIAL_REFUND].includes(o.paymentType) ? pv + o.amount : pv), 0);
    } else {
      return 0;
    }
  };

  const getAllClientsPartialRefundPartialChargebackAmount = (clients = [], status) => {
    return clients.reduce((acc, client) => {
      if (!["chargeback", "refunded"].includes(status)) {
        return acc + client.orders.reduce((pv, o) => ([PAYMENT_TYPES.CHARGEBACK, PAYMENT_TYPES.REFUND, PAYMENT_TYPES.PARTIAL_CHARGEBACK, PAYMENT_TYPES.PARTIAL_REFUND].includes(o.paymentType) ? pv + o.amount : pv), 0);
      }
    }, 0);
  };

  return {
    getClientWorth,
    getAllClientsWorth,
    getfirstOrderAmount,
    getNewOrderAndUpSellAmount,
    getRepaidAmount,
    getChargebackAmount,
    getPartialChargebackAmount,
    getRefundAmount,
    getPartialRefundAmount,
    getClientPartialChargebackAmount,
    getClientPartialRefundAmount,
    getAllClientsPartialRefundPartialChargebackAmount,
  };
};

export default clientWorthMethods;
