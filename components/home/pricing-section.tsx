import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import Link from 'next/link';

type PricingType = {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9,
    items: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Basic AI summaries',
      'Community support',
    ],
    description: 'For normal use',
    paymentLink: '',
    priceId: '',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15,
    items: [
      '10 PDF summaries per month',
      'Processing processing speed',
      'Email Support',
      'Basic AI summaries',
    ],
    description: 'For Professional use',
    paymentLink: '',
    priceId: '',
  },
];

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PricingType) => {
  return (
    <div className="max-w-lg">
      <div
        className={cn(
          'flex flex-col gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl',
          id === 'pro' && 'border-rose-500 gap-5 border-2'
        )}
      >
        <div>
          <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
          <p className="text-base-content/80 mt-2">{description}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <p className="text-xs uppercase font-semibold">USD</p>
          <p className="text-xs">/month</p>
        </div>

        <div>
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>

        <div className="space-y-2 flex justify-center w-full">
          <Link
            href={paymentLink}
            className="w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 text-white border-2 py-2"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section>
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>
        <div className="flex flex-col justify-center lg:flex-row items-center lg:items-stretch gap-8 ">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
