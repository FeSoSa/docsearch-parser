import * as pdfjsLib from 'pdfjs-dist';
import { ParsedDocument } from '../types';

export async function extractTextFromPdf(buffer: Buffer): Promise<ParsedDocument> {
    const data = new Uint8Array(buffer);
    const doc = await pdfjsLib.getDocument({ data: data }).promise;
    let fullText = '';

    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(' ');
        fullText += pageText + (pageText.length > 0 ? '\n' : '')
    }

    return {
        text: fullText,
        sourceType: 'pdf',
        metadata: { pageCount: doc.numPages }
    }
}