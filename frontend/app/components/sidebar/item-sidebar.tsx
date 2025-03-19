import React, { Children, type ReactElement, type ReactNode } from 'react'
import { NavLink } from 'react-router'
import Icon from './icon-sidebar';
import { IoDocument } from 'react-icons/io5';

type ItemProp = {
    text: string;
}

const ItemSidebar = ({children}:any) => {
    return (
        <div className="flex gap-2 p-4 justify-center items-center item-side">  
            {children}
        </div>
    )
}

export default ItemSidebar

