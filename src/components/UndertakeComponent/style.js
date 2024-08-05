import styled from "styled-components";

export const WrapperUndertakeHeader = styled.div`
  padding: 12px 0;
  border-width: 1px 0;
  border-style: solid;
  border-color: rgb(235, 235, 240);
  background: white;

  &:hover {
    cursor: pointer;
  }
`;

export const WrapperUndertake = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

export const WrapperTag = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding-left: 6px;
  font-size: 12px;
`;

export const Tag = styled.div`
  display: flex;
  padding: 0 6px;
  justify-content: space-between;
`;
