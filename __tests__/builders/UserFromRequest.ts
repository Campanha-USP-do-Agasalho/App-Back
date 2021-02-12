import { ROLE } from '@entities'

export type UserFromRequestProps = {
  id: string
  role: ROLE
}

export class UserFromRequestBuilder {
  private userFromRequest: UserFromRequestProps = {
    id: 'floquinho',
    role: ROLE.ADMIN
  }

  public static aUserFromRequest(): UserFromRequestBuilder {
    return new UserFromRequestBuilder()
  }

  public asCoord(): UserFromRequestBuilder {
    this.userFromRequest.role = ROLE.COORD
    return this
  }

  public asMember(): UserFromRequestBuilder {
    this.userFromRequest.role = ROLE.MEMBER
    return this
  }

  public withNotRegisteredId(): UserFromRequestBuilder {
    this.userFromRequest.id = 'naoehofloquinho'
    return this
  }

  public build(): UserFromRequestProps {
    return this.userFromRequest
  }
}
