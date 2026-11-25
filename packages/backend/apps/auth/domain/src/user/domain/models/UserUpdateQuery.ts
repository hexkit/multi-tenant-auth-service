import { type UserFindQuery } from './UserFindQuery.js';
import { type UserSetQuery } from './UserSetQuery.js';

export interface UserUpdateQuery {
  findQuery: UserFindQuery;
  setQuery: UserSetQuery;
}
