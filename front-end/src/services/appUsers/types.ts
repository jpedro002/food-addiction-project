export interface ICreateUser {
	name: string
	email: string
	password: string
	role: string
}

export interface IUser {
	id: number
	name: string
	email: string
	role: string
}

export interface IUpdateUser extends Omit<ICreateUser, 'password'> {}

export interface IUpdateUserResponse extends IUser {}

export interface IDeleteUser {
	id: number
}

export interface IListUsers {
	customerName?: string
	status?: string
}

export interface ISelfUpdatePassword {
	oldPassword: string
	newPassword: string
}
export interface ISelfUpdatePasswordResponse {
	message: string
}

export interface ISelfUpdateEmailAndName {
	email?: string
	name?: string
}
