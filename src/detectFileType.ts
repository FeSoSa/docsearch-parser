export function detectFile(buffer: Buffer): 'pdf' | 'docx' | undefined {
    const header = buffer.subarray(0, 4).toString('hex')

    switch (header) {
        case '25504446':
            return 'pdf'
        case '504b0304':
            return 'docx'
        case '504b0506':
            return 'docx'
        case '504b0708':
            return 'docx'
        default:
            return undefined
    }
}

