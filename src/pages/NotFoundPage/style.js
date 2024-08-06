import styled from "styled-components";
import { Button } from "antd";


export const NotFoundPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    height: 725px
`;

export const ImgWrapper = styled.div`
    width: 200px;
    height: 204px;
    margin-bottom: 24px;
`;

export const NotFoundImg = styled.img`
    width: 200px;
    height: 200px
`;

export const NotFoundText = styled.div`
    width: 290px;
    height: 24px; 
    margin-bottom: 24px; 
    font-size: 16px; 
    text-align: center
`;

export const NotFoundBtn = styled(Button)`
    width: 320px;
    height: 44px; 
    font-weight: 400; 
    fontSize: 16px; 
    color: #fff;
    border-radius: 4px
`