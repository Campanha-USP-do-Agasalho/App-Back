/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserFromRequestViewModel } from '@adapters/presentation/controllers/viewmodels'

export interface HttpResponse<BodyType = any> {
  statusCode: number
  body: BodyType
}

export interface HttpRequest<
  BodyType = any,
  QueryType = any,
  ParamsType = any
> {
  body: BodyType
  query: QueryType
  params: ParamsType
  accessToken?: string
}

export interface DecodedHttpRequest<
  BodyType = any,
  QueryType = any,
  ParamsType = any
> extends HttpRequest<BodyType, QueryType, ParamsType> {
  accessToken: string
  user: UserFromRequestViewModel
}
