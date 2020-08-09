import styled from "styled-components";

const CardContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    position: absolute;
    z-index: 10;
    margin: 20px; 
    padding: 20px;
    width: 25%;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

export {
    CardContainer
}