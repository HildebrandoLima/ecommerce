import { statusCode } from '@/server/status-code';

export function messages(status, data, message) {
  return statusCode(status, data, message);
}