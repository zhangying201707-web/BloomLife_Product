import { apiUrl } from '../../api';

async function request(path, options) {
  const res = await fetch(apiUrl(`/customer-journey${path}`), options);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

export async function getOccasions() {
  return request('/occasions');
}

export async function filterProducts(params = {}) {
  const query = new URLSearchParams();

  if (params.occasion) query.set('occasion', params.occasion);
  if (params.style) query.set('style', params.style);
  if (params.mood) query.set('mood', params.mood);

  return request(`/products/filter?${query.toString()}`);
}

export async function getPricing(productId) {
  return request(`/products/${productId}/pricing`);
}

export async function checkAvailability(productId, zipCode) {
  const query = new URLSearchParams({ productId: String(productId), zipCode: String(zipCode) });
  return request(`/availability?${query.toString()}`);
}

export async function saveGreetingCard(payload) {
  return request('/greeting-card', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function addGift(payload) {
  return request('/add-gift', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function saveDeliveryDetails(payload) {
  return request('/delivery-details', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function trackOrder(orderId) {
  return request(`/orders/${orderId}/track`);
}

export async function getNotifications(userId, unreadOnly = false) {
  const query = unreadOnly ? '?unreadOnly=true' : '';
  return request(`/notifications/${userId}${query}`);
}
