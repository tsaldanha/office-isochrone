import styled from "styled-components";

const List = styled.ul`
    margin: 0;
    padding: 0;
`;
const ListItem = styled.li`
    display: inline;
`

const ListItemAction = styled.button`
    background: none;
    border: 1px solid white;
    cursor: pointer;

    &:hover { 
        border: 1px solid black;
    }
`
export {
    List,
    ListItem,
    ListItemAction
};