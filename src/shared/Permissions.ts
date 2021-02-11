import { ROLE } from '@entities'

export class Permissions {
  static verifyPermissionOnRole = (
    userRole: ROLE,
    permission: ROLE
  ): boolean => {
    return userRole >= permission
  }
}
