import React from 'react';
import styled from 'styled-components';
import GNBIcons from './GNBIcons';
import GNBSearch from './GNBSearch';
import * as styleVariables from '../../styles/globalVariables';
const GNB = () => {
  return (
    <GNBContainer>
      <ContentsWrapper>
        <GNBLogo>Instagram</GNBLogo>
        <GNBSearch />
        <GNBIcons />
      </ContentsWrapper>
    </GNBContainer>
  );
};

export default GNB;

const GNBContainer = styled.div`
  width: 100%;
  height: ${styleVariables.gnb_height};
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${styleVariables.border_color};
  background-color: ${styleVariables.sub_color};
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 600px) {
    padding: 0 10px;
  }
`;

const GNBLogo = styled.div`
  font-size: 22px;
  color: ${styleVariables.main_color};
  border-radius: 6px;
  padding: 10px 12px;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: ${styleVariables.main_color};
    color: ${styleVariables.sub_color};
  }
  @media only screen and (max-width: 400px) {
    font-size: 18px;
  }
`;
