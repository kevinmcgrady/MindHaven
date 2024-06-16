'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createStripeCheckoutSession } from '@/queries/stripe';

import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

type CreateStripeSessionButtonProps = {
  buttonText: string;
  stripeProductId: string;
};

const CreateStripeSessionButton = ({
  buttonText,
  stripeProductId,
}: CreateStripeSessionButtonProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleCreateStripeSession = async () => {
    try {
      setIsSubmitting(true);
      const url = await createStripeCheckoutSession(stripeProductId);

      if (url) {
        return router.push(url);
      }
      throw new Error();
    } catch (error) {
      toast({
        title: 'Oops',
        description: 'There was an issue, please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button onClick={handleCreateStripeSession}>
      {isSubmitting ? (
        <Loader2 size={15} className='animate-spin' />
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default CreateStripeSessionButton;
