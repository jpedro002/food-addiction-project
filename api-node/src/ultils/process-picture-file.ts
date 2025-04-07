import { createWriteStream } from 'fs'
import path from 'path'
import { OUTPUTS_PATH } from '@/constants/paths'
import { MultipartFile } from '@fastify/multipart'
import { getUrlPublic } from './get-url-public'

export async function processPictureFile(
	pictureFile: MultipartFile,
	hostname: string,
	returnFileName = false,
): Promise<string> {
	const fileName = pictureFile.filename

	if (!fileName) {
		throw new Error('Não foi possível obter o nome do arquivo.')
	}

	const fileNameReplaced = fileName.replace(/ /g, '-')

	const filePath = path.join(OUTPUTS_PATH, fileNameReplaced)

	try {
		const buffer = await pictureFile.toBuffer()
		const fileStream = createWriteStream(filePath)
		fileStream.write(buffer)
		fileStream.end()

		if (returnFileName) {
			return fileNameReplaced
		}

		const fileUrl = getUrlPublic(fileNameReplaced, hostname)

		return fileUrl
	} catch (_error) {
		throw new Error('Erro ao processar o arquivo de imagem.')
	}
}
