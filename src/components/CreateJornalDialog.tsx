'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { aiVoices } from '@/constants/aiVoices';
import { moods } from '@/constants/moods';
import { createJornal } from '@/queries/journal';
import { generateAudioFile } from '@/queries/openai';

import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';

const CreateJornalDialog = () => {
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(2).max(50),
    journal: z.string().min(2),
    voice: z.string(),
    mood: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      journal: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsGenerating(true);

      const url = await generateAudioFile(values.journal, values.voice);

      if (!url) throw new Error('File was not generated correctly');

      await createJornal({
        title: values.title,
        entry: values.journal,
        audioUrl: url,
        mood: values.mood,
        voice: values.voice,
      });

      router.push('/jornal');
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a new jornal</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <Label className='text-sm font-semibold'>Title</Label>
                  <FormControl>
                    <Input className='mt-2' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='mood'
              render={({ field }) => (
                <FormItem>
                  <Label className='text-sm font-semibold'>
                    What mood are you in today?
                  </Label>

                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='w-[180px] mt-2'>
                        <SelectValue placeholder='Mood' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {moods.map((mood) => (
                        <SelectItem
                          key={mood.name}
                          value={mood.name.toUpperCase()}
                        >
                          {mood.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='voice'
              render={({ field }) => (
                <FormItem>
                  <Label className='text-sm font-semibold'>
                    Select an AI voice
                  </Label>

                  <Select
                    onValueChange={(voice: string) => {
                      field.onChange(voice);
                      setSelectedVoice(voice);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className='w-[180px] mt-2'>
                        <SelectValue placeholder='Voice' />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {aiVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    {selectedVoice && (
                      <audio
                        src={`/voices/${selectedVoice}.mp3`}
                        autoPlay
                        className='hidden'
                      />
                    )}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='journal'
              render={({ field }) => (
                <FormItem>
                  <Label className='text-sm font-semibold'>
                    Tell us about your day
                  </Label>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button>
              {isGenerating ? (
                <Loader2 size={20} className='animate-spin' />
              ) : (
                'Generate'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJornalDialog;
