import { useAppTitle } from '@/hooks/useAppTitle'
import { useAppSelector } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { QuestionnaireSchema, questionnaireSchema } from './schemas'
import { useFormFoodAdctionModelProps } from './types'

export const useFormFoodAdctionModel = ({
	foodAddictionService,
}: useFormFoodAdctionModelProps) => {
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [viewMode, setViewMode] = useState<'steps' | 'all'>('steps')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const userId = useAppSelector((state) => state.auth?.session?.id)

	const { createFormAnswer } = foodAddictionService

	useAppTitle({
		title: 'Form',
	})

	const questions = [
		{
			id: 0,
			text: 'Eu comi até o ponto em que eu me senti fisicamente doente',
		},
		{
			id: 1,
			text: 'Eu passei muito tempo me sentindo lento ou cansado após ter comido em excesso',
		},
		{
			id: 2,
			text: 'Eu evitei o trabalho, escola ou atividades sociais porque eu tive medo que eu fosse comer demais lá',
		},
		{
			id: 3,
			text: 'Se eu estivesse com problemas emocionais porque eu não tinha comido certos alimentos, gostaria de comê-los para me sentir melhor.',
		},
		{ id: 4, text: 'O meu comportamento alimentar me causou muito sofrimento' },
		{
			id: 5,
			text: 'Eu tive problemas significativos na minha vida por causa de comida. Podem ter sido problemas com a minha rotina diária, trabalho, escola, amigos, família, ou de saúde.',
		},
		{
			id: 6,
			text: 'Meus excessos com comida me prejudicaram no cuidado da minha família ou com tarefas domésticas',
		},
		{
			id: 7,
			text: 'Eu continuei comendo da mesma forma, mesmo este fato tendo me causado problemas emocionais.',
		},
		{
			id: 8,
			text: 'Comer a mesma quantidade de alimento não me deu tanto prazer como costumava me dar',
		},
		{
			id: 9,
			text: 'Eu tinha impulsos tão fortes para comer certos alimentos que eu não conseguia pensar em mais nada.',
		},
		{
			id: 10,
			text: 'Eu tentei e não consegui reduzir ou parar de comer certos alimentos',
		},
		{
			id: 11,
			text: 'Eu estava tão distraído pela ingestão que eu poderia ter sido ferido (por exemplo, ao dirigir um carro, atravessando a rua, operando máquinas)',
		},
		{
			id: 12,
			text: 'Nos últimos 12 meses Meus amigos ou familiares estavam preocupados com o quanto eu comia.',
		},
	]

	const frequencyOptions = [
		{ label: 'Nunca', value: 0 },
		{ label: 'Menos que mensalmente', value: 1 },
		{ label: 'Uma vez por mês', value: 2 },
		{ label: '2-3 vezes por mês', value: 3 },
		{ label: 'Uma vez por semana', value: 4 },
		{ label: '2-3 vezes por semana', value: 5 },
		{ label: '4-6 vezes por semana', value: 6 },
		{ label: 'Todos os dias', value: 7 },
	]

	const methods = useForm<QuestionnaireSchema>({
		resolver: zodResolver(questionnaireSchema),
		defaultValues: {
			patientId: '',
			answers: {},
		},
	})

	const {
		setValue,
		getValues,
		formState: { errors },
		handleSubmit,
		reset,
	} = methods

	const patientIdError = errors.patientId?.message as string | undefined

	const answersErrors: Record<number, string | undefined> = {}
	if (errors.answers) {
		if (typeof errors.answers.message === 'string') {
			questions.forEach((q) => {
				if (!getValues().answers[q.id]) {
					answersErrors[q.id] = errors.answers?.message?.message
				}
			})
		} else if (errors.answers.root?.message) {
			questions.forEach((q) => {
				if (!getValues().answers[q.id]) {
					answersErrors[q.id] = errors.answers?.root?.message as string
				}
			})
		}
	}

	const handlePatientIdChange = (value: string) => {
		setValue('patientId', value, { shouldValidate: true })
	}

	const handlePatientOriginChange = (value: string) => {
		setValue('patientOrigin', value, { shouldValidate: true })
	}

	const handleAnswerChange = (questionIndex: number, value: string) => {
		const numericValue = Number.parseInt(value, 10)
		console.log()

		setValue(`answers.${questionIndex}`, numericValue, { shouldValidate: true })
	}

	const handleViewModeChange = (mode: 'steps' | 'all') => {
		setViewMode(mode)
	}

	const goToNextQuestion = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1)
		}
	}

	const goToPreviousQuestion = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1)
		}
	}

	const calculateProgress = (currentQuestion: number): number => {
		return ((currentQuestion + 1) / questions.length) * 100
	}

	const getMaxPossibleScore = () => {
		return questions.length * 7
	}

	const onSubmit = async (data: any) => {
		setIsSubmitting(true)
		try {
			console.log('Submitting questionnaire data:', data)

			await createFormAnswer({
				identificadorPaciente: data.patientId,
				origem: data.patientOrigin,
				userId: Number(userId) || 1,
				q1: data.answers[0],
				q2: data.answers[1],
				q3: data.answers[2],
				q4: data.answers[3],
				q5: data.answers[4],
				q6: data.answers[5],
				q7: data.answers[6],
				q8: data.answers[7],
				q9: data.answers[8],
				q10: data.answers[9],
				q11: data.answers[10],
				q12: data.answers[11],
				q13: data.answers[12],
			})
			toast.success('Questionário enviado com sucesso!', {
				duration: 6000,
				action: {
					label: 'Fechar',
					onClick: () => {
						toast.dismiss()
					},
				},
			})
			setCurrentQuestion(0)
			window.scrollTo(0, 0)
			reset()
		} catch (error) {
			console.error('Erro ao enviar questionário:', error)

			if (isAxiosError(error)) {
				toast.error(
					error?.response?.data?.message || 'Erro ao enviar questionário.',
				)
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	const progress = calculateProgress(currentQuestion)

	return {
		questions,
		frequencyOptions,
		currentQuestion,
		viewMode,
		isSubmitting,
		patientIdError,
		answersErrors,
		progress,
		handlePatientIdChange,
		handleAnswerChange,
		handlePatientOriginChange,
		handleViewModeChange,
		goToNextQuestion,
		goToPreviousQuestion,
		onSubmit,
		handleSubmit,
		getMaxPossibleScore,
		methods,
		answers: getValues().answers,
	}
}
