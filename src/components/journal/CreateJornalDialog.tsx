'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mood, Voice } from '@prisma/client';
import { Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { PLANS } from '@/config/plans';
import { aiVoices } from '@/constants/aiVoices';
import { moods } from '@/constants/moods';
import { createJornal } from '@/queries/journal';
import { generateAudioFile } from '@/queries/openai';

type CreateJornalDialogProps = {
  isProPlan: boolean;
  varient?: 'default' | 'icon';
};

const CreateJornalDialog = ({
  isProPlan,
  varient = 'default',
}: CreateJornalDialogProps) => {
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const journalLength = isProPlan
    ? PLANS.pro.features.lengthOfJournals
    : PLANS.free.features.lengthOfJournals;

  const voices = isProPlan
    ? aiVoices
    : aiVoices.filter((voice) => voice.isFreePlan);

  const formSchema = z.object({
    title: z.string().min(2).max(50),
    journal: z.string().min(2).max(journalLength),
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
        mood: values.mood as Mood,
        voice: values.voice as Voice,
      });

      router.refresh();
    } catch (error) {
      toast({
        title: 'Oops',
        description:
          'There was an issue creating your journal, please try again',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={varient === 'icon' ? 'icon' : 'default'}>
          {varient === 'icon' ? <Plus size={15} /> : 'Create a new jornal'}
        </Button>
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
                        <SelectItem key={mood.name} value={mood.name}>
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
                      {voices.map((voice) => (
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
                <Loader2 size={15} className='animate-spin' />
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
