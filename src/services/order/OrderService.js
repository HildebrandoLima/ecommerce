import OrderRepository from '@/repositories/OrderRepository';
import { userAuth } from '@/storages/AuthStorage';
import { getCart, getTotalCart } from '@/storages/CartStorage';
import { setOrder } from '@/storages/CheckoutStorage';
import { messages } from '@/utils/messages/Message';
import { ITEMS_NOT_FOUND_MESSAGE, USER_NOT_FOUND_MESSAGE } from '@/utils/defaultMessages/DefaultMessage';

export let cart;
export let total;
export let userId;

export function statusCode(error) {
  return messages(
    error.response.data.status,
    error.response.data.data,
    error.response.data.message
  );
}

export default class OrderService {
  static getTotalCart() {
    this.total = parseFloat(getTotalCart()).toLocaleString(undefined, { minimumFractionDigits: 2 });
    return this.total;
  }

  static getUser() {
    const [userId] = userAuth();
    this.userId = userId;
    return this.userId;
  }

  static getCart() {
    this.cart = getCart();
    return this.cart;
  }

  static messageError(flag) {
    switch(flag) {
      case 'cart':
        if (this.cart.length === 0) {
          return ITEMS_NOT_FOUND_MESSAGE;
        }
      case 'user':
        return USER_NOT_FOUND_MESSAGE;
      case 'item':
        return ITEMS_NOT_FOUND_MESSAGE;
    }
  }

  static typeDeliveryChange(typeDelivery) {
    let deliveryValue = 0;
    if (typeDelivery === 'Expresso') {
      return deliveryValue = 20.00;
    } else if (typeDelivery === 'Correio') {
      return deliveryValue = 15.50;
    } else {
      return deliveryValue = 0;
    }
  }

  static createOrderItemObject(order) {
    this.cart.forEach((item) => {
      order.itens.push({
        nome: item.nome,
        preco: item.precoVenda,
        quantidadeItem: item.quantidade,
        subTotal: item.subTotal,
        produtoId: item.id,
      });
    });
  }

  static createOrderObject(order, total) {
    order.total = total;
    order.quantidadeItens = this.cart.length;
    order.usuarioId = this.userId;
    this.createOrderItemObject(order);
    return order;
  }

  static async createOrder(body) {
      try {
          const response = await OrderRepository.postOrder(body);
          setOrder(response.data.data);
          return response.data;
      } catch (error) {
          return statusCode(error);
      }
  }

  static async listOrders(page, perPage, id) {
      try {
        const response = await OrderRepository.getOrders(page, perPage, id);
        return response.data;
      } catch (error) {
        return statusCode(error);
      }
    }
}