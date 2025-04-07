export class InvalidOldPasswordError extends Error {
	constructor() {
		super('Senha antiga incorreta')
	}
}
