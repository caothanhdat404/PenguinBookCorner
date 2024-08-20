import styled from "styled-components";
import { Row, Input, Button } from "antd";

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

export const WrapperHeaderAccount = styled.div`
  display: flex;
  justify-content: right;
`;

export const HeaderButton = styled(Button)`
  max-width: 120px;
  color: #fff;
  font-size: 14px;
`;
