export interface ParsedDocument {
    text: string;
    sourceType: 'pdf' | 'docx';
    html?: string;
    metadata: {
        pageCount?: number;
    }
}