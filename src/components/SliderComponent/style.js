import styled from 'styled-components'

export const WrapperDots = styled.ul`
    li {
        width: 40px;
        top: 6px;

        div {
            width: 30px;
            height: 3px;
            border-radius: 4px;
            background-color: rgba(0,0,0,.26);
        }
    }
    
    li.slick-active > div {
        background-color: black;            
    }
`

export const WrapperDotsImage = styled.ul`
    display: flex; 
    gap: 66px; 
    padding: 0;
    align-items: center;

    li {
        margin: 0;
    }
    
    li.slick-active > a > img {
        border: 2px solid blue;
    }
`