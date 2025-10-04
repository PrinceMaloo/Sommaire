import UploadForm from '@/components/upload/uploadForm';
import UploadHeader from '@/components/upload/uploadHeader';

export default function Upload() {
  return (
    <section
      className="relative mx-auto flex flex-col items-center justify-center
    py-16 sm:py-20 lg:py-24 transition-all animate-in lg:px-12 max-w-7xl
    "
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <UploadHeader />
        <UploadForm />
      </div>
    </section>
  );
}
