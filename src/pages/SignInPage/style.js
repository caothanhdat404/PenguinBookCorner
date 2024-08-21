import styled from "styled-components";


export const WrapperHeaderAuth = styled.div`
    width: 100%;
    height: 84px;
    background: white;
    display: flex;
    align-items: center;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: rgb(235, 235, 240);
`

export const HeaderAuth = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 160px
`

export const HeaderLogo = styled.div`
    display: flex;
    align-items: center
`

export const Logo = styled.div`
    font-size: 20px;
    margin-right: 8px;
    background-color: rgb(26, 148, 255);
    color: white;
    padding: 8px;

    &:hover {
        cursor: pointer;
    }
`

export const NeedHelp = styled.div`
    font-size: 14px;
    color: rgb(26, 148, 255);

    &:hover {
        cursor: pointer;
        opacity: 0.8
    }
`

export const WrapperBodyAuth = styled.div`
    width: 100%;
    height: 600px;
    background-color: rgb(26, 148, 255);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const BodyAuth = styled.div`
    width: 416px;
    height: 500px;
    background-color: white;
    border-radius: 4px;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const Help = styled.div`
    width: 100%;
    height: 14px;
    color: rgb(26, 148, 255);
    font-size: 12px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
        cursor: pointer;
        opacity: 0.85;
    }
`

export const OtherWay = styled.div`
    width: 100%;
    height: 78px;
`

export const SignUpByOtherWay = styled.div`
    font-size: 14px;
    width: 100%;
    height: 38px;
    margin: 5px;
    color: rgba(0,0,0,.87);
    padding: 0 8px 0 2px;
    border: 1px solid rgba(0,0,0,.26);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;

    &:hover {
        cursor: pointer;
        opacity: 0.85;
    }
`

export const WrapperBrandIcon = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 8px;
`

export const BrandIcon = styled.img`
    width: 100%;
    height: 100%;
`

export const ChangeState = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, .26);
    text-align: center;
    padding: 35px 0 22px 0;

    a {
        color: rgb(26, 148, 255);
        text-decoration: none;
    }
`