import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { extractTextFromDocx } from '../src/parsers/docxParser';
import { extractTextFromPdf } from '../src/parsers/pdfParser';

describe('PdfParser', () => {
    it('Should parse pdf to text', async () => {
        const samplePath = path.join(__dirname, 'fixture', 'sample.pdf');
        const buffer = readFileSync(samplePath)
        const result = await extractTextFromPdf(buffer)

        expect(result.sourceType).toBe('pdf')
        expect(result.text.length).toBeGreaterThan(0)

        const sample2Path = path.join(__dirname, 'fixture', 'sample2.pdf');
        const buffer2 = readFileSync(sample2Path)
        const result2 = await extractTextFromPdf(buffer2)

        expect(result2.sourceType).toBe('pdf')
        expect(result2.text.length).toBeGreaterThan(0)
    })

    it('Should try parse empty pdf', async () => {
        const samplePath = path.join(__dirname, 'fixture', 'blank.pdf');
        const buffer = readFileSync(samplePath)
        const result = await extractTextFromPdf(buffer)
        console.log(result)
        expect(result.sourceType).toBe('pdf')
        expect(result.text.length).toBe(0)
    })

    it('Should throw error when parse corrupt pdf to text', async () => {
        try {
            const samplePath = path.join(__dirname, 'fixture', 'corrupt.pdf');
            const buffer = readFileSync(samplePath)
            await extractTextFromPdf(buffer)
        } catch (error: any) {
            expect(error.name).toBe('InvalidPDFException')
        }
    })

    it('Should throw error when parse different file to text', async () => {
        try {
            const samplePath = path.join(__dirname, 'fixture', 'sample.docx');
            const buffer = readFileSync(samplePath)
            await extractTextFromPdf(buffer)
        } catch (error: any) {
            expect(error.name).toBe('InvalidPDFException')
        }
    })
})

describe('DocxParser', () => {
    it('Should parse docx to text', async () => {
        const samplePath = path.join(__dirname, 'fixture', 'sample.docx');
        const buffer = readFileSync(samplePath)
        const result = await extractTextFromDocx(buffer)

        expect(result.sourceType).toBe('docx')
        expect(result.text.length).toBeGreaterThan(0)

        const sample2Path = path.join(__dirname, 'fixture', 'sample2.docx');
        const buffer2 = readFileSync(sample2Path)
        const result2 = await extractTextFromDocx(buffer2)

        expect(result2.sourceType).toBe('docx')
        expect(result2.text.length).toBeGreaterThan(0)
    })

    it('Should throw error when parse corrupt docx to text', async () => {
        try {
            const samplePath = path.join(__dirname, 'fixture', 'corrupt.docx');
            const buffer = readFileSync(samplePath)
            await extractTextFromDocx(buffer)
        } catch (error: any) {
            expect(error.name).toBe('Error')
        }
    })

    it('Should throw error when parse different file to text', async () => {
        try {
            const samplePath = path.join(__dirname, 'fixture', 'sample.pdf');
            const buffer = readFileSync(samplePath)
            await extractTextFromDocx(buffer)
        } catch (error: any) {
            expect(error.name).toBe('Error')
        }
    })
})