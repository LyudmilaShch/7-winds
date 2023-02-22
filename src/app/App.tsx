import React, { useEffect } from 'react';

import LinearProgress from '@mui/material/LinearProgress';

import { Sidebar } from '../features/sidebar/Sidebar';

import s from './App.module.scss';
import { statusSelector } from './selectors';

import { ErrorSnackbar } from 'components';
import { HeaderMenu } from 'features/header';
import ProjectWorks from 'features/projectWorks/ProjectWorks';
import { fetchTableRows } from 'features/projectWorks/tableRowsSlice';
import { useAppDispatch, useAppSelector } from 'hooks';

export default function App() {
  const status = useAppSelector(statusSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTableRows());
  }, [dispatch]);

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
