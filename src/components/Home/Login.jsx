import React, { useCallback, useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as styleVariables from '../../styles/globalVariables';
import {
  checkIdValidation,
  checkLogin,
  checkPwValidation,
} from './Login.modules';
import { lighten } from 'polished';
import { useEffect } from 'react';

const Login = () => {
  const id = useRef('');
  const pw = useRef('');

  const [idValidation, setIdValidation] = useState(false);
  const [pwValidation, setPwValidation] = useState(false);
  const [isEmptyInputId, setIsEmptyInputId] = useState(true);
  const [isEmptyInputPw, setIsEmptyInputPw] = useState(true);
  const navigate = useNavigate();

  //페이지 종료 후 재접속시 id 정보가 남아있다면, 바로 main page로 이동.
  useEffect(() => {
    if (window.localStorage.getItem('currentUser')) {
      navigate('/main');
    }
  }, []);

  const inputKeyDownHandler = useCallback((e) => {
    if (e.key === 'Enter') {
      loginButtonClickHandler();
    }
  });
  const inputIDChangeHandler = useCallback((e) => {
    id.current = e.target.value;

    //입력값이 변경될때마다 validation 검사
    setIdValidation(checkIdValidation(e.target.value));

    if (e.target.value != '') setIsEmptyInputId(false);
    else setIsEmptyInputId(true);
  }, []);

  const inputPWChangeHandler = useCallback((e) => {
    pw.current = e.target.value;

    //입력값이 변경될때마다 validation 검사
    setPwValidation(checkPwValidation(e.target.value));

    if (e.target.value != '') setIsEmptyInputPw(false);
    else setIsEmptyInputPw(true);
  }, []);

  const loginButtonClickHandler = useCallback(() => {
    //id, pw중 하나라도 유효성이 검증되지 않으면 아무것도 하지않는다.
    if (!idValidation || !pwValidation) return;

    checkLogin(id.current, pw.current).then((response) => {
      console.log('respon', response);
      if (response) {
        // success login function return bool

        //기존 데이터 삭제
        window.localStorage.removeItem('currentUser');
        //localstorage에 login 정보 저장
        window.localStorage.setItem('currentUser', id.current);
        //main page로 이동
        navigate('./main');
      } else {
        alert('로그인에 실패했습니다. 로그인 정보를 확인해주세요.');
      }
    });
  }, [idValidation, pwValidation]);

  return (
    <LoginContainer>
      <Logo>Instagram</Logo>
      <InputID
        spellCheck={false}
        placeholder="전화번호, 사용자 이름 또는 이메일"
        onChange={inputIDChangeHandler}
        validation={idValidation}
        isEmpty={isEmptyInputId}
      />
      <InputPW
        spellCheck={false}
        type="password"
        placeholder="비밀번호"
        onChange={inputPWChangeHandler}
        validation={pwValidation}
        isEmpty={isEmptyInputPw}
        onKeyDown={inputKeyDownHandler}
      />
      <LoginButton
        onClick={loginButtonClickHandler}
        validationPw={pwValidation}
        validationId={idValidation}
      >
        Login
      </LoginButton>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 340px;
  height: 400px;
  border: 1px solid ${styleVariables.main_color};
  border-radius: 14px;
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 42px;
  margin: 20px 0;
  padding: 20px 0;
  color: ${styleVariables.main_color};
`;

const InputID = styled.input`
  width: 100%;
  border: ${(props) =>
    !props.isEmpty && !props.validation
      ? '1px solid red'
      : '1px solid #e5e5e5'};
  margin: 6px 0;
  height: 46px;
  padding: 0 6px;
  border-radius: 6px;
`;
const InputPW = styled(InputID)``;

const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) =>
    props.validationId && props.validationPw
      ? styleVariables.main_color
      : lighten(0.1, styleVariables.main_color)};
  color: ${styleVariables.sub_color};
`;
