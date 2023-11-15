import { messages } from '@/utils/messages/Message';
import {
    CART_NOT_FOUND_MESSAGE, CATEGORY_NOT_FOUND_MESSAGE,
    ITEMS_NOT_FOUND_MESSAGE, ORDER_TO_GENERATE_MESSAGE,
    ORDER_NOT_FOUND_MESSAGE, PRODUCT_NOT_FOUND_MESSAGE,
    PROVIDER_NOT_FOUND_MESSAGE, REGISTER_REQUIRED_MESSAGE,
    SEARCH_PRODUCT_NOT_FOUND_MESSAGE, USER_NOT_FOUND_MESSAGE
} from '@/utils/defaultMessages/DefaultMessage';

export default class MessagesService {
    static statusCode(error) {
        return messages(
            error.response.data.status,
            error.response.data.data,
            error.response.data.message
        );
    }

    static messageSuccess(data) {
        return Swal.fire({
            icon: 'success',
            title: data.message,
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.reload(1);
            }
        });
    }

    static messageError(flag) {
        switch(flag) {
        case 'cart':
            return CART_NOT_FOUND_MESSAGE;
        case 'category':
            return CATEGORY_NOT_FOUND_MESSAGE;
        case 'create-order':
            return ORDER_NOT_FOUND_MESSAGE;
        case 'item':
            return ITEMS_NOT_FOUND_MESSAGE;
        case 'order':
            return ORDER_TO_GENERATE_MESSAGE;
        case 'product':
            return PRODUCT_NOT_FOUND_MESSAGE;
        case 'provider':
            return PROVIDER_NOT_FOUND_MESSAGE;
        case 'register':
            return REGISTER_REQUIRED_MESSAGE;
        case 'search':
            return SEARCH_PRODUCT_NOT_FOUND_MESSAGE;
        case 'user':
            return USER_NOT_FOUND_MESSAGE;
        }
    }
}