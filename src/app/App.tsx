import React, { useEffect } from 'react';

import LinearProgress from '@mui/material/LinearProgress';

import s from './App.module.scss';
import { statusSelector } from './selectors';

import { ErrorSnackbar } from 'components';
import { Sidebar, HeaderMenu, ProjectWorks, fetchTableRows } from 'features';
import { useAppDispatch, useAppSelector } from 'hooks';

export default function App() {
  const status = useAppSelector(statusSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTableRows());
  }, []);

  return (
    <div className={s.app}>
      <ErrorSnackbar />
      <div className={s.headerBlock}>
        <HeaderMenu />
        {status === 'loading' && <LinearProgress color="inherit" />}
      </div>
      <div className={s.mainBlock}>
        <Sidebar />
        <ProjectWorks />
      </div>
    </div>
  );
}
