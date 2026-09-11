import { detectFile } from "../detectFileType";
import { ParsedDocument } from "../types";
import { extractTextFromDocx } from "./docxParser";
import { extractTextFromPdf } from "./pdfParser";

export async function parseFile(buffer: Buffer): Promise<ParsedDocument> {
    const type = await detectFile(buffer)

    switch (type) {
        case 'pdf':
            return await extractTextFromPdf(buffer)
        case 'docx':
            return await extractTextFromDocx(buffer)
        default:
            throw null
    }

}