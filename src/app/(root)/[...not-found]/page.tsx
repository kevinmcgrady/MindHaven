import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { urls } from '@/constants/urls';
import { cn } from '@/lib/utils';

function NotFoundPage() {
  return (
    <div className='container flex flex-col items-center'>
      <Image src='/images/404.svg' alt='Not Found' height={450} width={450} />
      <Link
        className={cn(buttonVariants(), 'mb-32')}
        href={urls.dashboard.root}
      >
        Back to safety
      </Link>
    </div>
  );
}

export default NotFoundPage;
