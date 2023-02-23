import React, { useState } from 'react';

import { ItemProjectTitle } from './itemProjectTitle';
import s from './Sidebar.module.scss';

import downArrow from 'assets/images/downArrow.svg';
import upArrow from 'assets/images/upArrow.svg';

export function Sidebar() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className={s.sidebarContainer}>
      <div className={s.sidebarHeader}>
        <div className={s.titles}>
          <div className={s.mainTitle}>Название проекта</div>
          <div className={s.dopTitle}>Аббревеатура</div>
        </div>
        {open ? (
          <button type="button" onClick={() => setOpen(false)}>
            <img src={downArrow} alt="downArrow" />
          </button>
        ) : (
          <button type="button" onClick={() => setOpen(true)}>
            <img src={upArrow} alt="downArrow" />
          </button>
        )}
      </div>
      {open && (
        <div className={s.projectsBlock}>
          <ItemProjectTitle projectName="По проекту" />
          <ItemProjectTitle projectName="Объекты" />
          <ItemProjectTitle projectName="РД" />
          <ItemProjectTitle projectName="МТО" />
          <ItemProjectTitle projectName="СМР" active />
          <ItemProjectTitle projectName="График" />
          <ItemProjectTitle projectName="МиМ" />
          <ItemProjectTitle projectName="Рабочие" />
          <ItemProjectTitle projectName="КапВложения" />
        </div>
      )}
    </div>
  );
}
