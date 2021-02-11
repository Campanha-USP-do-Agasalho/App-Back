import { Either } from '@shared/Either'

export interface UseCase<
  Props = null,
  PossibleErrors = null,
  SuccessResponse = null
> {
  execute(props: Props): Promise<Either<PossibleErrors, SuccessResponse>>
}
