import React from 'react';

import s from './ProjectWorksHeader.module.scss';

type ProjectWorksHeaderType = {
  projectName: string;
};

export function ProjectWorksHeader({ projectName }: ProjectWorksHeaderType) {
  return (
    <div className={s.ProjectWorksHeader}>
      <div className={s.projectName}>{projectName}</div>
    </div>
  );
}
