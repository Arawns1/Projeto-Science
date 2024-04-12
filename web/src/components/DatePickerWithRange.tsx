/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { HTMLAttributes, useState } from "react"
import { DateRange } from "react-day-picker"

interface DatePickerWithRangeProps extends HTMLAttributes<HTMLDivElement> {
  value: {
    from: Date
    to: Date
  }
  onDateChange: (date: DateRange) => void
}

export function DatePickerWithRange({
  className,
  value,
  onDateChange,
  ...rest
}: DatePickerWithRangeProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: value.from,
    to: value.to,
  })

  const handleDateSelected = (date: DateRange | undefined) => {
    if (date) {
      onDateChange(date)
    }
    setDate(date)
  }

  return (
    <div className={cn("grid gap-2", className)} {...rest}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full h-12 justify-start text-left font-normal border-zinc-300 text-muted-foreground text-base",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL, y", {
                    locale: ptBR,
                  })}{" "}
                  -{" "}
                  {format(date.to, " dd LLL, y", {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(date.from, "dd LLL, y", {
                  locale: ptBR,
                })
              )
            ) : (
              <span>Selecione um Período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-background"
          align="start"
          side="top"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={value}
            onSelect={handleDateSelected}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
