import * as R from 'ramda';
import { select } from 'redux-most'

import { LOGIN } from '../constants'

export const rootEpic = R.pipe(
    select(LOGIN),
);
