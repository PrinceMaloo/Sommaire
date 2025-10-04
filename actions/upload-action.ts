'use server';

import summaryFromGemini from '@/lib/gemini';
import extractText from '@/lib/langchain';

export async function generatePdfsummary(uploadFile: {
  userId: string;
  fileUrl: string;
}) {
  if (!uploadFile) {
    return {
      success: false,
      message: 'File is not found while parsing',
      data: null,
    };
  }

  const serverData: {
    userId: string;
    fileUrl: string;
  } = uploadFile;

  if (!serverData.fileUrl) {
    return {
      success: false,
      message: 'No URL Found on UploadThing',
      data: null,
    };
  }

  if (!serverData.userId) {
    return {
      success: false,
      message: 'Unauthorised Access',
      data: null,
    };
  }

  try {
    const extractedTextFromPdf = await extractText(serverData.fileUrl);
    const summary = await summaryFromGemini(extractedTextFromPdf);

    if (!summary) {
      return {
        success: false,
        message: 'No summary generated',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Summary Successfully generated',
      data: summary,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Not able to get the summary',
      data: null,
    };
  }
}
