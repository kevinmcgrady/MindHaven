import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type MonthYearDropdownProps = {
  defaultMonth: string;
  defaultYear: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
};

const MonthYearDropdown = ({
  defaultMonth,
  defaultYear,
  onMonthChange,
  onYearChange,
}: MonthYearDropdownProps) => {
  return (
    <div className='flex justify-end gap-4 items-center'>
      <Select
        defaultValue={defaultMonth}
        onValueChange={(value) => onMonthChange(value)}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue defaultValue={defaultMonth} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='Jun'>Jun</SelectItem>
            <SelectItem value='May'>May</SelectItem>
            <SelectItem value='Apr'>Apr</SelectItem>
            <SelectItem value='Mar'>Mar</SelectItem>
            <SelectItem value='Feb'>Feb</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        defaultValue={defaultYear}
        onValueChange={(value) => onYearChange(value)}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue defaultValue={defaultYear} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='2024'>2024</SelectItem>
            <SelectItem value='2023'>2023</SelectItem>
            <SelectItem value='2022'>2022</SelectItem>
            <SelectItem value='2021'>2021</SelectItem>
            <SelectItem value='2020'>2020</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthYearDropdown;
