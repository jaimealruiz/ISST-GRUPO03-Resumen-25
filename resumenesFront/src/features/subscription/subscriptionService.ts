// src/features/subscription/subscriptionService.ts
import { api } from '../../utils/api';

export const getSubscriptionStatus = async (): Promise<{
  active: boolean;
  endDate?: string;
}> => {
  return await api('/subscription/status');
};

export const createCheckoutSession = async (): Promise<{
  url: string;
}> => {
  return await api('/subscription/checkout', {
    method: 'POST',
  });
};

export const cancelSubscription = async (): Promise<any> => {
  console.log("aquiaqui");
  return await api('/subscription/cancel', {
    method: 'POST',
  });
};
