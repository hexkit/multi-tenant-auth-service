import {
  type User,
  type UserFindQuery,
} from '@multi-tenant-auth-service/auth-domain';

export const findManyUsersOutputPortSymbol: unique symbol = Symbol.for(
  '@multi-tenant-auth-service/auth-application/FindManyUsersOutputPort',
);

export interface FindManyUsersOutputPort {
  findMany(superAdminMembershipFindQuery: UserFindQuery): Promise<User[]>;
}
