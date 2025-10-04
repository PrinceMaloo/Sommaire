import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center">
      <Badge
        className="relative p-[1px] bg-white rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 
        bg-clip-text text-transparent border-rose-200 group
        "
      >
        <div className="flex items-center rounded-full justify-center pr-2 group-hover:bg-rose-200 group-hover:text-white transition-colors duration-200">
          <Sparkles className="h-6 w-10 m-2  text-rose-600 animate-pulse" />
          <p>AI Powered Content Creation</p>
        </div>
      </Badge>
      <h1 className="font-bold py-6 text-center text-2xl sm:text-3xl md:text-4xl">
        Start Uploading your PDF's
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 text-gray-600">
        Upload your PDF and Let AI do the magic
      </h2>
    </div>
  );
}
