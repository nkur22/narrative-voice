declare module "pdf-parse/lib/pdf-parse.js" {
  interface PDFInfo {
    PDFFormatVersion: string;
    IsAcroFormPresent: boolean;
    IsXFAPresent: boolean;
    [key: string]: unknown;
  }
  interface PDFData {
    numpages: number;
    numrender: number;
    info: PDFInfo;
    metadata: unknown;
    text: string;
    version: string;
  }
  function PDFParse(
    dataBuffer: Buffer,
    options?: Record<string, unknown>
  ): Promise<PDFData>;
  export = PDFParse;
}
