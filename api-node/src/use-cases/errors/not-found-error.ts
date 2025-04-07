export class notFoundError extends Error {
	constructor() {
		super('Resource not found.')
	}
}
