import React from 'react';
import styled from 'styled-components';
import Login from '../components/Home/Login';

const Home = () => {
  return (
    <HomeContainer>
      <Login />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
