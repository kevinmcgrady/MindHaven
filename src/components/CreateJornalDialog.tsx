import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a new jornal</Button>
      </DialogTrigger>
      <DialogContent>
        <div className='mb-4'>
          <Label className='text-sm font-semibold'>Title</Label>
          <Input className='mt-2' type='text' />
        </div>

        <div className='mb-4'>
          <Label className='text-sm font-semibold'>
            What mood are you in today?
          </Label>

          <Select>
            <SelectTrigger className='w-[180px] mt-2'>
              <SelectValue placeholder='Mood' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='sad'>Sad</SelectItem>
              <SelectItem value='anxious'>Anxious</SelectItem>
              <SelectItem value='happy'>Happy</SelectItem>
              <SelectItem value='depressed'>Depressed</SelectItem>
              <SelectItem value='exited'>Exited</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='mb-4'>
          <Label className='text-sm font-semibold'>Select an AI voice</Label>

          <Select>
            <SelectTrigger className='w-[180px] mt-2'>
              <SelectValue placeholder='Voice' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='sad'>Alloy</SelectItem>
              <SelectItem value='anxious'>Person</SelectItem>
              <SelectItem value='happy'>Person</SelectItem>
              <SelectItem value='depressed'>Person</SelectItem>
              <SelectItem value='exited'>Person</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='mb-4'>
          <Label className='text-sm font-semibold'>
            Tell us about your day
          </Label>
          <Textarea />
        </div>

        <Button>Generate</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJornalDialog;
