import React, {ReactNode, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {useDispatch, useSelector} from "react-redux";

// Redux infra
import { sliceKey, reducer, actions } from './slice';
import { tableWatcher } from './sagas';
import { selectDataForTable } from './selectors';

// Components
import { NavBar } from '../NavBar';
import { Table } from './TableArea';
import { PageWrapper } from 'app/components/PageWrapper';

export function HomePage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: tableWatcher });

  const dispatch = useDispatch();
  const rows: Array<Array<ReactNode>> = useSelector(selectDataForTable);

  useEffect(() => {
    dispatch(actions.initModule());
    dispatch(actions.initUpdates());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Company Analysis</title>
        <meta
          name="description"
          content="Company Analysis application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Table rows={rows}/>
      </PageWrapper>
    </>
  );
}
