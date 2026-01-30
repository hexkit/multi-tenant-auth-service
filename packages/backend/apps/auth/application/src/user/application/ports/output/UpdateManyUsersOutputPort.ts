import {
  type User,
  type UserUpdateQuery,
} from '@multi-tenant-auth-service/auth-domain';

export const updateManyUsersOutputPortSymbol: unique symbol = Symbol.for(
  '@multi-tenant-auth-service/auth-application/UpdateManyUsersOutputPort',
);

export interface UpdateManyUsersOutputPort {
  updateMany(superAdminMembershipUpdateQuery: UserUpdateQuery): Promise<User[]>;
}
