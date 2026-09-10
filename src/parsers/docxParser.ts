import mammoth from "mammoth";
import { ParsedDocument } from "../types";

export async function extractTextFromDocx(buffer: Buffer): Promise<ParsedDocument> {
    const resultHtml = await mammoth.convertToHtml({ buffer })
    const resultText = await mammoth.extractRawText({ buffer })

    console.log(resultText)

    return {
        sourceType: 'docx',
        text: resultText.value,
        html: resultHtml.value,
        metadata: {}
    }
}