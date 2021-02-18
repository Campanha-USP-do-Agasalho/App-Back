import { Name } from '@entities'
import { InvalidNameError } from '@entities/errors'

import { Either, left, right } from '@shared/Either'

export type TeamProps = {
  id: string
  name: string
  fullName: string
}

export class Team {
  private constructor(
    private name: Name,
    private fullName: Name,
    private id: string
  ) {}

  get value(): TeamProps {
    return {
      name: this.name.value,
      fullName: this.fullName.value,
      id: this.id
    }
  }

  public static create(props: {
    name: string
    fullName?: string
    id?: string
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

    return right(
      new Team(
        name,
        fullName,
        props.id || name.value.split(' ')[0].toLowerCase()
      )
    )
  }
}
