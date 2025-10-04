import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components//ui/badge';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative mx-auto flex flex-col items-center justify-center
    py-16 sm:py-20 lg:py-24 transition-all animate-in lg:px-12 max-w-7xl
    "
    >
      <div className="flex flex-col items-center">
        <Badge
          className="relative p-[1px] bg-white rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 
        bg-clip-text text-transparent border-rose-200 group
        "
        >
          <div className="flex items-center rounded-full justify-center pr-2 group-hover:bg-rose-200 group-hover:text-white transition-colors duration-200">
            <Sparkles className="h-6 w-10 m-2  text-rose-600 animate-pulse" />
            <p>Powerered by AI</p>
          </div>
        </Badge>
        <h1 className="font-bold py-6 text-center text-2xl sm:text-3xl md:text-4xl">
          Transform PDFs into concise summaries
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 text-gray-600">
          Get a beautiful summary reel of the document in seconds
        </h2>
        <Button
          variant={'link'}
          className=" text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-7
          py-6 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 
          hover:no-underline
    
          "
        >
          <Link href="/#pricing" className="flex gap-2 items-center">
            <span> Try Sommarise </span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
