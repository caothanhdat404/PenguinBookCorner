import styled from "styled-components";
import { Row, Input, Button } from "antd";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const { Search } = Input;

export const WrapperHeader = styled(Row)`
  width: 100%;
  padding: 16px 120px;
  background-color: rgb(26, 148, 255);
`;

export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: left;
`;

export const WrapperSearchHeader = styled.div`
  display: flex;
  width: 100%;
`;

export const SearchWrapper = styled(Search)`
  flex: 1;
`;

export const StyleTippy = styled(Tippy)`
  width: 200px;
  background-color: white;
  color: black;
  border: 1px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 6px 12px 0px;
  padding: 10px 0;

  .tippy-box {
    background-color: white;
  }

  .tippy-content {
    padding: 0;
  }

  .tippy-arrow {
    display: none;
  }
`;

export const WrapperUserOption = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const UserOption = styled.div`
  height: 38px;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 16px;
  font-size: 14px;
  text-align: left;

  &:hover {
    background-color: #cbcbcc;
    cursor: pointer;
  }
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  justify-content: right;
`;

export const HeaderButton = styled(Button)`
  max-width: 120px;
  color: #fff;
  font-size: 14px;

`
