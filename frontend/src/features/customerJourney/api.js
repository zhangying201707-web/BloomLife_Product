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

export async function getSubscriptionSummary(userId) {
  return request(`/subscriptions/${userId}`);
}

export async function updateSubscription(userId, payload) {
  return request(`/subscriptions/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function getSupportOptions() {
  return request('/support/options');
}

export async function startSupportChat(payload) {
  return request('/support/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function trackOrder(orderId) {
  return request(`/orders/${orderId}/track`);
}

export async function getDeliveryAssurance(orderId) {
  return request(`/orders/${orderId}/delivery-assurance`);
}

export async function getNotifications(userId, unreadOnly = false) {
  const query = unreadOnly ? '?unreadOnly=true' : '';
  return request(`/notifications/${userId}${query}`);
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

export async function getUserProfile(userId) {
  return request(`/profile/${userId}`);
}

export async function updateUserProfile(userId, payload) {
  return request(`/profile/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
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

export async function getAdminSubscriptions() {
  return request('/admin/subscriptions');
}

export async function updateAdminSubscriptionStatus(subscriptionId, shipmentStatus) {
  return request(`/admin/subscriptions/${subscriptionId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shipmentStatus }),
  });
}

export async function getSalesAnalytics() {
  return request('/admin/analytics');
}
