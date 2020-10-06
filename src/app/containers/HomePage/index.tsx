import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useDispatch } from "react-redux";

// Redux infra
import { sliceKey, reducer, actions } from './slice';
import { tableWatcher } from './sagas';

// Components
import { NavBar } from '../NavBar';
import { Table } from './TableArea';
import { PageWrapper } from 'app/components/PageWrapper';

export function HomePage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: tableWatcher });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.initModule());

    const t = setTimeout(dispatch(actions.initUpdates()), 1000);
    return () => { clearTimeout(t)};
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
        <Table rows={[]}/>
      </PageWrapper>
    </>
  );
}
