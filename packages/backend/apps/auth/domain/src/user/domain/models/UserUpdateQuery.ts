import { UserFindQuery } from './UserFindQuery.js';
import { UserSetQuery } from './UserSetQuery.js';

export interface UserUpdateQuery {
  findQuery: UserFindQuery;
  setQuery: UserSetQuery;
}
