import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'

type PatientIdFieldProps = {
	onChange: (value: string) => void
	error?: string
}

export function PatientIdField({ onChange, error }: PatientIdFieldProps) {
	const { register } = useFormContext()

	return (
		<div className="mb-6">
			<div className="grid gap-2">
				<Label htmlFor="patientId" className="font-medium">
					ID do Paciente
				</Label>
				<Input
					id="patientId"
					type="text"
					placeholder="Digite o ID do paciente"
					className={error ? 'border-red-500' : ''}
					{...register('patientId', {
						onChange: (e) => onChange(e.target.value),
					})}
				/>
				{error && <p className="text-sm text-red-500">{error}</p>}
			</div>
		</div>
	)
}
