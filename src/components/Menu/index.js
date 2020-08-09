import React from 'react';
import { List, ListItem, ListItemAction } from "./styled";

const Menu = () => (
    <List>
        <ListItem> <ListItemAction> O Projeto </ListItemAction></ListItem>
        <ListItem> <ListItemAction> Filtros </ListItemAction></ListItem>
        <ListItem> <ListItemAction> Solução </ListItemAction></ListItem>
    </List>
)

export default Menu;