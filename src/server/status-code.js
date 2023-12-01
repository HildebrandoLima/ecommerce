import { removeAuth } from '@/storages/AuthStorage';

export function statusCode(status, data, message) {
    let flag = false;
    switch (status) {
    case 200:
        flag = true;
        return alert(flag, message);
    case 400:
        return data;
    case 401:
        flag = flag;
        return alert(flag, message);
    case 403:
        flag = flag;
        return alert(flag, message);
    case 404:
        return message;
    case 500:
        flag = flag;
        return alert(flag, message);
    default:
        return 'Status Desconhecido.';
    }

    function alert(flag, message) {
        let icon = '';
        if (flag === false) {
            icon = 'error';
            removeAuth();
        }

        icon = 'success';

        throw Swal.fire({
            icon: icon,
            title: message,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload(1);
            }
        });
    }
};