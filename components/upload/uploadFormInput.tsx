'use client';

import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react';
import { z } from 'zod';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';
import { generatePdfsummary } from '@/actions/upload-action';
import { Loader2 } from 'lucide-react';
import { title } from 'process';
import { fi } from 'zod/v4/locales';
import { storePdfSummaryAction } from '@/actions/summary-action';
import { useRouter } from 'next/navigation';

const schema = z.object({
  file: z
    .instanceof(File, {
      message: 'Invalid File',
    })
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      'File should be less than 2MB'
    )
    .refine(
      (file) => file.type.startsWith('application/pdf'),
      'File must be PDF'
    ),
});

export default function UploadFormInput() {
  const formref = useRef<HTMLFormElement>(null);
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const { startUpload, routeConfig } = useUploadThing('fileUploader', {
    onClientUploadComplete: () => {
      toast('Upload Completed');
    },
    onUploadError: () => {
      toast('Upload error');
    },
    onUploadBegin: () => {
      toast('Uploading....');
    },
  });

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get('uploadFile') as File;

      const validationField = schema.safeParse({ file });
      if (!validationField.success) {
        console.log(
          validationField.error.flatten().fieldErrors?.file?.[0] ??
            'File is not validated'
        );
        formref.current?.reset();
        setisLoading(false);
        return;
      }

      const resp = await startUpload([file]);
      if (!resp) {
        formref.current?.reset();
        setisLoading(false);
        return;
      }

      console.log('Submitted');

      console.log('Resp', resp);

      const summary = await generatePdfsummary(resp[0].serverData);
      const fileName = resp[0].name;

      const fileUrl = resp[0].ufsUrl;
      const title = fileName.replace(/\.[^/.]+$/, '');
      const { success = null, message = null, data = null } = summary || {};

      if (data) {
        toast('Saving your PDF', {
          description: 'Uploading PDF',
        });
        formref.current?.reset();

        const storePdfResponse = await storePdfSummaryAction({
          pdfSummary: data,
          title,
          fileName,
          fileUrl,
        });

        if (storePdfResponse.success === false) {
          toast.error(storePdfResponse.message || 'Error storing PDF summary');
        } else {
          if (storePdfResponse?.data?.id) {
            toast.success('PDF Summary stored successfully');
            router.push(`/summaries/${storePdfResponse.data.id}`);
          }
        }

        setisLoading(false);
      }
    } catch (error) {
      formref.current?.reset();
      setisLoading(false);
    }
  };

  return (
    <form
      className="flex justify-center items-center gap-6"
      onSubmit={HandleSubmit}
      ref={formref}
    >
      <input
        type="file"
        id="uploadFile"
        accept="application/pdf"
        name="uploadFile"
        required
      />
      <Button disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            "Processing..."
          </>
        ) : (
          'Upload'
        )}
      </Button>
    </form>
  );
}
