export class UserAlreadyExistsError extends Error {
	constructor() {
		super('already exists.')
	}
}
