'use server';

import { getDBConnection } from '@/app/action';
import { auth, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

interface StorePdfSummaryActionProps {
  pdfSummary: string;
  fileUrl: string;
  title: string;
  fileName: string;
}

interface SavePdfSummaryProps extends StorePdfSummaryActionProps {
  userEmail: string; // guaranteed string
}

async function savePdfSummary(props: SavePdfSummaryProps) {
  try {
    const sql = await getDBConnection();
    const result: any = await sql`SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'pdf_summaries'`;
    console.log('Table Columns:', result);
    const { userEmail, fileUrl, pdfSummary, title, fileName } = props;

    console.log('userEmail', userEmail);

    const idObject =
      await sql`INSERT INTO pdf_summaries ("user_email","fileUrl","summary","title","file_name")
                VALUES (
                ${userEmail},
                ${fileUrl},
                ${pdfSummary},
                ${title},
                ${fileName}
                
    )returning id`;

    const id = idObject[0].id;
    return {
      success: true,
      data: {
        id: id,
      },
    };
  } catch (error) {
    console.log('Error saving PDF summary:', error);
    throw new Error('Error saving PDF summary');
  }
}
export async function storePdfSummaryAction(props: StorePdfSummaryActionProps) {
  try {
    const { fileUrl, pdfSummary, title, fileName } = props;
    const userId = await auth();

    console.log('userId', userId);
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        message: 'User not authenticated',
        data: null,
      };
    }
    const userEmail = user.emailAddresses[0]?.emailAddress;

    if (!userId || !userEmail) {
      return {
        success: false,
        message: 'User not authenticated',
        data: null,
      };
    }

    const savePdfResult = await savePdfSummary({
      userEmail,
      fileUrl,
      pdfSummary,
      title,
      fileName,
    });
    const id = savePdfResult?.data?.id;

    revalidatePath(`/summaries/${id}`);
    return {
      success: true,
      message: 'PDF Summary stored successfully',
      data: savePdfResult.data,
    };
  } catch (error) {
    console.log('Error in storing PDF Summary:', error);
    return {
      success: false,
      message: 'Error storing PDF Summary',
      data: null,
    };
  }
}
