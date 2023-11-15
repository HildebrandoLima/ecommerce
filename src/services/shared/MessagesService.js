import { messages } from '@/utils/messages/Message';

export default class MessagesService {
    static statusCode(error) {
        return messages(
            error.response.data.status,
            error.response.data.data,
            error.response.data.message
        );
    }

    static messagesError() {
        //
    }

    static messagesSuccess() {
        //
    }
}