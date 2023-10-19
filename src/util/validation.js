// 회원가입 및 로그인 관련 유효성 검사 코드 (API)

// 소문자 알파벳(a-z) 또는 숫자(0-9) && 길이가 7에서 12자 사이
export const validateUserId = (value) => {
  const regex = /^[a-z0-9]{7,12}$/;
  return regex.test(value);
};

// 특수 문자를 적어도 한 번 포함 && 최소 8자 이상
export const validatePassword = (value) => {
  const regex = /^(?=.*[\W_]).{8,}$/;
  return regex.test(value);
};
