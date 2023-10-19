// 회원가입 및 로그인 관련 유효성 검사 코드 (API)

export const validateUserId = (value) => {
  const regex = /^[a-z0-9]{7,12}$/; // 숫자와 영어를 결합하여 7부터 12자리
  return regex.test(value);
};

export const validatePassword = (value) => {
  const regex = /^(?=.*[\W_]).{6,}$/; // 대문자를 제외한 정규 표현식
  return regex.test(value);
};
