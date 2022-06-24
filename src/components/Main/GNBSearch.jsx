import React from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import * as styleVariables from '../../styles/globalVariables';

const GNBSearch = () => {
  return (
    <SearchContainer>
      <InputIcon>
        <BsSearch />
      </InputIcon>
      <InputSearch placeholder="검색" />
    </SearchContainer>
  );
};
export default GNBSearch;
const SearchContainer = styled.div`
  width: 300px;
  height: 40px;
  display: flex;
  background-color: ${styleVariables.main_color};
  border-radius: 6px;
  padding: 10px;
  min-width: 120px;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const InputIcon = styled.div`
  width: 32px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${styleVariables.sub_color}; ;
`;

const InputSearch = styled.input`
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 6px;
  color: ${styleVariables.sub_color};
  &::placeholder {
    color: ${styleVariables.sub_color};
  }
`;
