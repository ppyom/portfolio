/**
 * 랜덤한 코드를 생성하는 함수
 * @param length 생성할 코드의 단어 수 (default: 6)
 */
export const createCode = (length: number = 6) =>
  Math.random()
    .toString(32)
    .substring(2, 2 + length)
    .toUpperCase();
