import React from 'react';
import styled from 'styled-components';
import {
  AiFillHome,
  AiOutlineMessage,
  AiOutlineMeh,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import * as styleVariables from '../../styles/globalVariables';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
const GNBIcons = () => {
  const navigate = useNavigate();

  const logoutButtonClickHandler = useCallback(() => {
    window.localStorage.removeItem('currentUser');
    navigate('/');
  }, []);

  return (
    <IconsContainer>
      <IconWrapper>
        <AiFillHome />
      </IconWrapper>
      <IconWrapper>
        <AiOutlineMessage />
      </IconWrapper>
      <IconWrapper>
        <AiOutlineUserAdd />
      </IconWrapper>
      <IconWrapper>
        <AiOutlineMeh />
      </IconWrapper>
      <LogoutButton onClick={logoutButtonClickHandler}>logout</LogoutButton>
    </IconsContainer>
  );
};

export default GNBIcons;

const IconsContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
const IconWrapper = styled.div`
  width: 32px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${styleVariables.main_color};
  cursor: pointer;
  @media only screen and (max-width: 400px) {
    width: 24px;
    font-size: 18px;
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  width: 70px;
  height: 24px;
  font-size: 18px;
  cursor: pointer;
  color: ${styleVariables.main_color};
  transition: 0.4s;
  border-radius: 6px;
  &:hover {
    background-color:  ${styleVariables.main_color};
    color:  ${styleVariables.sub_color};
  }
`;
