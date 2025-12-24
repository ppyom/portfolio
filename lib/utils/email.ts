/**
 * 이메일주소 유효한 형식인지 검사하는 함수
 * @param email 이메일주소
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
