import { IIdManager } from '@useCases/ports/external/utils'

export class IdManagerByName implements IIdManager {
  async generate(ref?: string): Promise<string> {
    if (!ref) return ''
    return ref.trim().replace(/ /g, '.').toLowerCase()
  }
}
