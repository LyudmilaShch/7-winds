import React from 'react';

import s from './ItemProjectTitle.module.scss';

import projectIcon from 'assets/images/projectIcon.svg';

type ProjectWorksHeaderType = {
  projectName: string;
  active?: boolean;
};

// eslint-disable-next-line react/require-default-props
export function ItemProjectTitle({ projectName, active }: ProjectWorksHeaderType) {
  const itemActiveClassName = `${s.active} ${s.project}`;

  return (
    <div className={active ? itemActiveClassName : s.project}>
      <img src={projectIcon} alt="projectIcon" />
      <p>{projectName}</p>
    </div>
  );
}
