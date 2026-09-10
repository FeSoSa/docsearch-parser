export interface ParsedDocument {
    text: string;
    sourceType: 'pdf' | 'docx';
    metadata: {
        pageCount?: number;
    }
}