import { z } from 'zod'

export const questionnaireSchema = z.object({
	patientId: z
		.string()
		.min(1, 'ID do paciente é obrigatório')
		.regex(/^\d+$/, 'ID do paciente deve conter apenas números'),

	patientOrigin: z.string().min(1, 'Origem do paciente é obrigatória'),
	answers: z
		.record(
			z.string(),
			z.number({
				required_error: 'Por favor, selecione uma opção',
				invalid_type_error: 'Por favor, selecione uma opção válida',
			}),
		)
		.refine((answers) => Object.keys(answers).length === 13, {
			message: 'Todas as perguntas devem ser respondidas',
			path: ['answers'],
		}),
})

export type QuestionnaireSchema = z.infer<typeof questionnaireSchema>
