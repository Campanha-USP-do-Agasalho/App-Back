export interface IIdManager {
  generate: (ref?: string) => Promise<string>
}
