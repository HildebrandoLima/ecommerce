import { removeAuth } from '@/storages/AuthStorage';

export function messages(status, data, message) {
  switch (status) {
    case 400:
      return data;
    case 401:
      alert(message);
    case 403:
      alert(message);
    case 404:
      return message;
    case 500:
      alert(message);
    default:
      return 'Status Desconhecido.';
  }
}

function alert(message) {
  removeAuth();
  throw Swal.fire({
    icon: 'error',
    title: message,
  });
}