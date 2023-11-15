//token 가져오기
export const setToken = (token) => {
  console.log(token);
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

//id 가져오기
export const setUuid = (id) => {
  localStorage.setItem('id', id);
};

export const getUuid = () => {
  return localStorage.getItem('id');
};
