export class ShortLinkAlreadyExistsError extends Error {
  constructor() {
    super('URL encurtada já existe')
  }
}
