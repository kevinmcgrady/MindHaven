'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateUsersProfile } from '@/queries/auth';

import CardSection from './layout/CardSection';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export const WelcomeScreen = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formSchema = z.object({
    country: z.string().min(2).max(50),
    bio: z.string().min(2).max(500),
    mentalHealthGoal: z.string().min(2).max(500),
    username: z.string().min(2).max(20),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: '',
      bio: '',
      mentalHealthGoal: '',
      username: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await updateUsersProfile({
        bio: values.bio,
        country: values.country,
        mentalHealthGoal: values.mentalHealthGoal,
        username: values.username,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CardSection noSpacing>
      <h1 className='font-semibold mb-2 text-2xl'>Welcome to MindHaven 👋</h1>
      <p className='mb-8 font-light text-muted-foreground'>
        We are glad you have decided to track <strong>your</strong> mental
        health journey with us!
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <Label className='text-sm font-semibold'>Username</Label>
                <FormControl>
                  <Input className='mt-2' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem>
                <Label className='text-sm font-semibold'>
                  Where are you from?
                </Label>
                <FormControl>
                  <Input
                    placeholder='Canada'
                    className='mt-2'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <Label className='text-sm font-semibold'>Bio</Label>
                <FormControl>
                  <Textarea className='mt-2' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='mentalHealthGoal'
            render={({ field }) => (
              <FormItem>
                <Label className='text-sm font-semibold'>
                  What is your mental health goal?
                </Label>
                <FormControl>
                  <Textarea
                    placeholder='I want to feel more comfortable in social situations.'
                    className='mt-2'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>
            {isSubmitting ? (
              <Loader2 className='animate-spin' size={20} />
            ) : (
              'Join!'
            )}
          </Button>
        </form>
      </Form>
    </CardSection>
  );
};
