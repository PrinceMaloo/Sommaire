import { Pizza } from 'lucide-react';

export default function DemoSection() {
  return (
    <section>
      <div className="flex flex-col items-center text-center space-y-4">
        <div>
          <Pizza className="h-6 w-6 text-rose-500" />
        </div>
        <div className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
          Watch how Sommaire transforms{' '}
          <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
            this Next.js course PDF{' '}
          </span>
          into an easy-to-read summary!
        </div>
      </div>
    </section>
  );
}
