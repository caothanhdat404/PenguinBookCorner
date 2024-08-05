import styled from "styled-components";
import { Row, Col } from "antd";

export const WrapperFooter = styled(Row)`
  width: 100%;
  height: 300px;
  //   position: fixed;
  bottom: 0;
  padding: 34px 124px 0 124px;
  border-width: 1px 0;
  border-style: solid;
  border-color: rgb(235, 235, 240);
`;

export const TagFooter = styled(Col)`
  font-size: 16px
`

export const Tag = styled.div`
  color: rgb(26, 148, 255);
  text-transform: uppercase;
  margin-bottom: 20px
`

export const NavFooter = styled.a`
  display: block;
  color: black;
  margin-bottom: 12px;

  &hover {
    color: rgb(26, 148, 255)
  }
`
