import { api } from '@/lib/axios'
import { IBedsService } from './IBedsService'
import {
	IBedDetails,
	ICreateBed,
	ICreateBedResponse,
	ICreatePatient,
	IListBedsQuery,
	ListBedsResponse,
} from './types'

export const bedsService: IBedsService = {
	create: async (bedData: ICreateBed) => {
		const { data } = await api.post<ICreateBedResponse>('/beds', bedData)
		return data
	},

	list: async ({
		bedName,
		checkStatus,
		occupancyStatus,
		patientRecord,
	}: IListBedsQuery) => {
		const searchParams = new URLSearchParams()

		if (bedName) {
			searchParams.append('name', bedName)
		}
		if (patientRecord) {
			searchParams.append('medicalRecordId', patientRecord)
		}
		if (checkStatus) {
			searchParams.append(
				'checkedToday',
				checkStatus === 'checked' ? 'true' : 'false',
			)
		}
		if (occupancyStatus) {
			searchParams.append(
				'available',
				occupancyStatus === 'available' ? 'true' : 'false',
			)
		}

		const { data } = await api.get<ListBedsResponse>(
			`/beds?${searchParams.toString()}`,
		)
		return data
	},

	getBedDetails: async (bedId: number) => {
		const { data } = await api.get<IBedDetails>(`/beds/${bedId}/details`)
		return data
	},

	removePatientFromBed: async (bedId: number) => {
		await api.patch(`/beds/${bedId}/remove-patient`)
	},

	addPatientToBed: async (bedId: number, data: ICreatePatient) => {
		await api.post(`/beds/${bedId}/add-patient`, data)
	},
}
