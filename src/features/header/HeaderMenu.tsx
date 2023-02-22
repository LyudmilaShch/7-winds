import React, { useState } from 'react';

import s from './HeaderMenu.module.scss';

import back from 'assets/images/backMenu.svg';
import menu from 'assets/images/menu.svg';

type MenuType = 'Menu' | 'Back' | 'MainTable' | 'Control';
export function HeaderMenu() {
  const [activeItem, setActiveItem] = useState<MenuType>('MainTable');
  const itemActiveClassName = `${s.active} ${s.item}`;

  return (
    <div className={s.HeaderMenuContainer}>
      <div className={s.HeaderMenu}>
        <button
          type="button"
          onClick={() => setActiveItem('Menu')}
          className={activeItem === 'Menu' ? itemActiveClassName : s.item}
        >
          <img src={menu} alt="Menu" />
        </button>
        <button
          type="button"
          onClick={() => setActiveItem('Back')}
          className={activeItem === 'Back' ? itemActiveClassName : s.item}
        >
          <img src={back} alt="Back" />
        </button>
        <button
          type="button"
          onClick={() => setActiveItem('MainTable')}
          className={activeItem === 'MainTable' ? itemActiveClassName : s.item}
        >
          Просмотр
        </button>
        <button
          type="button"
          onClick={() => setActiveItem('Control')}
          className={activeItem === 'Control' ? itemActiveClassName : s.item}
        >
          Управление
        </button>
      </div>
    </div>
  );
}
