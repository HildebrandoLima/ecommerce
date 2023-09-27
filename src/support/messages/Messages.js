export function messages(status, data, message) {
  console.log(status, data, message);
  switch (status) {
    case 400:
      return data;
    case 401:
      throw alert(message);
    case 403:
      throw alert(message);
    case 404:
      return message;
    case 500:
      throw alert(message);
    default:
      return 'Status Desconhecido.';
  }
}