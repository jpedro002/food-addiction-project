import {
	IBedDetails,
	ICreateBed,
	ICreateBedResponse,
	ICreatePatient,
	IListBedsQuery,
	ListBedsResponse,
} from './types'

export interface IBedsService {
	create(userData: ICreateBed): Promise<ICreateBedResponse>

	list(filters: IListBedsQuery): Promise<ListBedsResponse>

	getBedDetails(bedId: number): Promise<IBedDetails>

	removePatientFromBed(bedId: number): Promise<void>

	addPatientToBed(bedId: number, patient: ICreatePatient): Promise<void>
}
