import { FileText, BrainCircuit, FileOutput } from 'lucide-react';
import React, { ReactNode } from 'react';

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: 'Upload you PDF',
    description: 'Simply drag and drop your document or click to upload',
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: 'AI Analysis',
    description:
      'Our advanced AI processes and analyzes your document instantly',
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: 'Get Summary',
    description: 'Receive a clear, concise summary of your document',
  },
];

function StepItem({ icon, label, description }: Step) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex items-center justify-center h-24 w-24
      mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent hover:from-rose-500/20 transition-colors
      "
      >
        <div className="text-rose-500">{icon}</div>
      </div>
      <h4 className="text-center font-bold text-xl">{label}</h4>
      <p className="text-center text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section>
      <div className="flex flex-col justify-center items-center text-center">
        <div className="font-bold text-xl uppercase mb-4 text-rose-500">
          How It Works
        </div>
        <div className="font-bold text-3xl max-2-xl mx-auto max-w-2xl ">
          Transform any PDF into an easy-to-digest summary in three simple steps
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-30">
        {steps.map((step, index) => (
          <StepItem key={index} {...step} />
        ))}
      </div>
    </section>
  );
}
