import { Name } from '@entities'
import { InvalidNameError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

export type TeamProps = {
  name: string
  fullName: string
}

export class Team {
  name: Name
  fullName: Name

  private constructor(name: Name, fullName: Name) {
    this.name = name
    this.fullName = fullName
  }

  get value(): TeamProps {
    return {
      name: this.name.value,
      fullName: this.fullName.value
    }
  }

  public static create(props: {
    name: string
    fullName?: string
  }): Either<InvalidNameError, Team> {
    const nameOrError = Name.create(props.name)
    if (nameOrError.isLeft()) return left(nameOrError.value)
    const name = nameOrError.value

    let fullName = name
    if (props.fullName) {
      const fullNameOrError = Name.create(props.fullName)
      if (fullNameOrError.isLeft()) return left(fullNameOrError.value)
      fullName = fullNameOrError.value
    }

    return right(new Team(name, fullName))
  }
}
