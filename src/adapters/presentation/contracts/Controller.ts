import { DecodedHttpRequest, HttpRequest, HttpResponse } from './Http'

export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}

export interface ControllerWithDecoding {
  handle: (request: DecodedHttpRequest) => Promise<HttpResponse>
}
