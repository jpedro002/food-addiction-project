export class InvalidLoginCredancials extends Error {
	constructor() {
		super('Email or password invalid')
	}
}
