export interface ICreateBed {
	name?: string
	autoGenerate: boolean
}

export interface ICreateBedResponse {
	id: number
	name: string
	patientProfileId: null
}

export interface IListBedsQuery {
	bedName?: string
	patientRecord?: string
	checkStatus?: string
	occupancyStatus?: string
}

export interface IBed {
	id: number
	name: string | null
	patientProfileId: number | null
	available: boolean
	checkedToday: boolean
	medicalRecordId: string
	patientName: string
}

export type ListBedsResponse = {
	beds: IBed[]
}

interface IPatient {
	id: number
	name: string
	medical_record_code: string
	dateOfBirth: string
}

export interface IPressureUlcerAssessment {
	id: number
	createdAt: string
	numericAnswer: number
	nurseName: string
}

export interface IBedDetails {
	id: number
	patientProfileId: number | null
	patient: IPatient | null
	PressureUlcerAssessments: IPressureUlcerAssessment[]
}

export interface ICreatePatient {
	patient: {
		name: string
		dateOfBirth: string
		medical_record_code: string
	}
}
