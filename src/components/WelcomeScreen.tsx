'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CardSection from '@/components/layout/CardSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { updateUsersProfile } from '@/queries/auth';

export const WelcomeScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();
  const { toast } = useToast();

  const formSchema = z.object({
    country: z
      .string()
      .min(2, 'Your country must be 2 chars or more')
      .max(50, 'Your country must be less than 50 chars'),
    bio: z
      .string()
      .min(2, 'Your bio must be 2 chars or more')
      .max(500, 'Your bio must be less than 500 chars'),
    mentalHealthGoal: z
      .string()
      .min(2, 'Your goal must be more than 2 chars')
      .max(500, 'Your goal must be less than 500 chars'),
    username: z
      .string()
      .min(2, 'Your username must be more than 2 chars')
      .max(20, 'Your country must be less than 20 chars'),
    tags: z
      .string()
      .optional()
      .refine(() => tags.length > 0, { message: 'You must enter a tag' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: '',
      bio: '',
      mentalHealthGoal: '',
      username: '',
      tags: '',
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
        tags: tags,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Oops',
        description:
          'There was an error updating your profile information, please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = (tag: string | undefined) => {
    if (!tag) return;
    setTags((tags: any) => [...tags, tag.toUpperCase()]);
  };

  return (
    <CardSection noSpacing>
      <h1 className='font-semibold mb-2 text-3xl'>Welcome to MindHaven 👋</h1>
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
            name='tags'
            render={({ field }) => (
              <FormItem>
                <Label className='text-sm font-semibold'>Tags</Label>
                <FormControl>
                  <Input
                    placeholder='social anxiety'
                    className='mt-2'
                    type='text'
                    {...field}
                  />
                </FormControl>

                <FormMessage />

                <Button
                  type='button'
                  size='icon'
                  className='!mt-4'
                  onClick={() => {
                    handleAddTag(field.value);
                    form.resetField('tags');
                  }}
                >
                  <Plus size={15} />
                </Button>
                {tags.length > 0 && (
                  <div className='flex gap-2 pt-4'>
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        className='text-sm rounded-sm'
                        variant='outline'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
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
              <Loader2 className='animate-spin' size={15} />
            ) : (
              'Join!'
            )}
          </Button>
        </form>
      </Form>
    </CardSection>
  );
};
