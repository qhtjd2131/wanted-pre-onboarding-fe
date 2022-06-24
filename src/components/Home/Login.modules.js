import axios from 'axios';

export const checkIdValidation = (id) => {
  const bool =
    /^(?=.*\.)(?=.*\@)[A-Za-z\d@~!@#$%^&*()-_=+\|\[\]{};:'",.<>/?]+$/g.test(id);

  return bool;
};

export const checkPwValidation = (pw) => {
  const bool =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&()\-_=+|[\]{};:'",.<>/?])[A-Za-z\d~!@#$%^&()\-_=+|[\]{};:'",.<>/?]{8,}/g.test(
      pw
    );

  return bool;
};

export const checkLogin = async (id, pw) => {
  const response = await axios
    .get(`http://localhost:8080/users?userName=${id}`)
    .catch(() => {
      return {
        data: [],
      };
    });
  if (response.data.length === 0) {
    // console.log('동일한 id가 없음');
    return false;
  } else if (response.data[0].passWord != pw) {
    // console.log('비밀번호 오류');
    return false;
  } else {
    // console.log('로그인 성공');
    return true;
  }
};
