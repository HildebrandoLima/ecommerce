import { messages } from '@/utils/messages/Message';

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

    static messagesError() {
        //
    }
}