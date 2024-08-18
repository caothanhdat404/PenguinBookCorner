import styled from 'styled-components'

export const WrapperDots = styled.ul`
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