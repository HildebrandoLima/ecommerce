export function setOrder(data) {
  return localStorage.setItem('orderId', data);
}

export function getOrder() {
  return localStorage.getItem('orderId');
}

export function removeOrder() {
  return localStorage.removeItem('orderId');
}