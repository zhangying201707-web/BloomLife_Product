import { apiUrl } from '../../api';

async function request(path, options) {
  const res = await fetch(apiUrl(`/customer-journey${path}`), options);
  const raw = await res.text();
  let data = null;

  try {
    data = raw ? JSON.parse(raw) : {};
  } catch (_error) {
    data = { error: raw || `HTTP ${res.status}` };
  }

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
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
  if (params.maxBudget) query.set('maxBudget', params.maxBudget);
  if (params.trendingOnly) query.set('trendingOnly', 'true');

  return request(`/products/filter?${query.toString()}`);
}

export async function getTrendingArrangements() {
  return request('/products/trending');
}

export async function compareProducts(productIds) {
  return request(`/products/compare?productIds=${productIds.join(',')}`);
}

export async function getProductDetails(productId) {
  return request(`/products/${productId}/details`);
}

export async function getProductReviews(productId) {
  return request(`/products/${productId}/reviews`);
}

export async function getProductGallery(productId) {
  return request(`/products/${productId}/gallery`);
}

export async function getWrappingOptions(productId) {
  return request(`/products/${productId}/wrapping`);
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

export async function saveFavoriteMessage(payload) {
  return request('/messages/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function getFavoriteMessages(userId) {
  return request(`/messages/favorites/${userId}`);
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

export async function applyPromoCode(payload) {
  return request('/promo/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function getPaymentMethods() {
  return request('/payment-methods');
}

export async function subscribeMonthlyBox(payload) {
  return request('/subscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function getUserSubscriptions(userId) {
  return request(`/subscriptions/user/${userId}`);
}

export async function manageSubscription(subscriptionId, payload) {
  return request(`/subscriptions/${subscriptionId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function getSubscriptionThemes() {
  return request('/subscriptions/themes');
}

export async function getSupportOptions() {
  return request('/support/options');
}

export async function getFaqs() {
  return request('/support/faqs');
}

export async function getSupportChat(userId) {
  return request(`/support/chat/${userId}`);
}

export async function sendSupportMessage(payload) {
  return request('/support/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function trackOrder(orderId) {
  return request(`/orders/${orderId}/track`);
}

export async function getOrderHistory(username) {
  return request(`/orders/history/${encodeURIComponent(username)}`);
}

export async function reorderPreviousPurchase(orderId, username) {
  return request(`/orders/${orderId}/reorder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });
}

export async function saveFavoriteProduct(payload) {
  return request('/products/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function getFavoriteProducts(userId) {
  return request(`/products/favorites/${userId}`);
}

export async function getPersonalInfo(userId) {
  return request(`/users/${userId}/profile`);
}

export async function updatePersonalInfo(userId, payload) {
  return request(`/users/${userId}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function getNotifications(userId, unreadOnly = false) {
  const query = unreadOnly ? '?unreadOnly=true' : '';
  return request(`/notifications/${userId}${query}`);
}

export async function getAdminProducts() {
  return request('/admin/products');
}

export async function createAdminProduct(payload) {
  return request('/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function updateAdminProduct(productId, payload) {
  return request(`/admin/products/${productId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function getAdminOrders() {
  return request('/admin/orders');
}

export async function updateAdminOrderStatus(orderId, status) {
  return request(`/admin/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
}

export async function getAdminSubscriptionShipments() {
  return request('/admin/subscription-shipments');
}

export async function updateAdminSubscriptionShipmentStatus(shipmentId, status) {
  return request(`/admin/subscription-shipments/${shipmentId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
}

export async function getAdminSalesAnalytics() {
  return request('/admin/sales-analytics');
}
