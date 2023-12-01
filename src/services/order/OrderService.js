import OrderRepository from '@/repositories/OrderRepository';
import MessagesService from '../shared/MessagesService';
import { userAuth } from '@/storages/AuthStorage';
import { getCart, getTotalCart } from '@/storages/CartStorage';
import { setOrder } from '@/storages/CheckoutStorage';

export let cart;
export let total;
export let userId;

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
    return MessagesService.messageError(flag);
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

  static createOrderObject(order, total) {
    order.quantidadeItens = this.cart.length;
    order.total = total;
    order.usuarioId = this.userId;
    order.itens = this.createOrderItemObject();
    return order;
  }

  static createOrderItemObject() {
    const orderItems = [];
    this.cart.forEach((item) => {
      orderItems.push({
        nome: item.nome,
        preco: item.precoVenda,
        quantidadeItem: item.quantidade,
        subTotal: item.subTotal,
        produtoId: item.id,
      });
    });
    return orderItems;
  }

  static async createOrder(body) {
      try {
          const response = await OrderRepository.postOrder(body);
          setOrder(response.data.data);
          return response.data;
      } catch (error) {
          return MessagesService.statusCode(error);
      }
  }

  static async listOrders(page, perPage, id) {
      try {
        const response = await OrderRepository.getOrders(page, perPage, id);
        return response.data;
      } catch (error) {
        return MessagesService.statusCode(error);
      }
    }
}