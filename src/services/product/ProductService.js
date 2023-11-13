import ProductRepository from '@/repositories/ProductRepository';
import { messages } from '@/utils/messages/Message';

export function statusCode(error) {
  return messages(
    error.response.data.status,
    error.response.data.data,
    error.response.data.message
  );
}

export default class ProductService {
  static formatPrice(value) {
    value = value.replace(/[^0-9.,]/g, '');
    value = value.replace(/,/g, '');

    let numericValue = parseInt(value);
    value = numericValue + '';
    value = value.replace(/([0-9]{2})$/g, ",$1");

    if (value.length > 6) {
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    return value;
  }

  static editProductModal(editedItem, item) {
    editedItem.id = item.produtoId;
    editedItem.nome = item.nome;
    editedItem.descricao = item.descricao;
    editedItem.quantidade = item.quantidade;
    editedItem.precoVenda = item.precoVenda;
    editedItem.precoCusto = item.precoCusto;
    editedItem.codigoBarra = item.codigoBarra;
    editedItem.unidadeMedida = item.unidadeMedida;
    editedItem.dataValidade = item.dataValidade;
    editedItem.codigoBarra = item.codigoBarra;
    editedItem.categoriaId = item.categoriaId;
    editedItem.fornecedorId = item.fornecedorId;
    editedItem.ativo = item.ativo;
    $('#editProductModal').modal('show');
  }

  static async createProduct(body) {
    try {
      const response = await ProductRepository.postProduct(body);
      return response.data;
    } catch (error) {
      return statusCode(error);
    }
  }

  static async editProduct(body) {
    try {
      const response = await ProductRepository.putProduct(body);
      return response.data;
    } catch (error) {
      return messages(
        error.response.data.status,
        error.response.data.data,
        error.response.data.message
      );
    }
  }

  static async listProducts(page, perPage, search, id, ativo) {
      try {
        const response = await ProductRepository.getProducts(page, perPage, search, id, ativo);
        return response.data;
      } catch (error) {
        return statusCode(error);
      }
  }

  static async getProductDetails(id) {
      try {
        let ativo = 1;
        const response = await ProductRepository.getProduct(id, ativo);
        return response.data;
      } catch (error) {
        return statusCode(error);
      }
  }
}