import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Contents from '../components/Main/Contents';
import GNB from '../components/Main/GNB';

const Main = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
  });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = window.localStorage.getItem('currentUser');

    //로그인된 유저가 있다면
    if (currentUser) {
      setUserInfo(currentUser);
      setIsLogin(true);
    } else {
      navigate('/', { replace: true });
      alert('로그인이 필요합니다.');
    }
  }, []);

  return (
    <MainContainer>
      {isLogin && <GNB />}
      {isLogin && <Contents userInfo={userInfo} />}
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
