import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.table || initialState;

export const selectCompanies = createSelector(
    [selectDomain],
    domain => domain.companies,
);
