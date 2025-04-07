export class UserAlreadyRegistedInTeamError extends Error {
	constructor() {
		super('user already registed.')
	}
}
