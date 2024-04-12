import { DatePickerWithRange } from "@/components/DatePickerWithRange"
import DiscardDialog from "@/components/DiscardDialog"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { CronogramaFormData, CronogramaSchema } from "./CronogramaSchema"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addDays } from "date-fns"
import { AddNewButton } from "@/components/AddNewButton"
import { Trash } from "@phosphor-icons/react"

export default function CronogramaPage() {
  const form = useForm<CronogramaFormData>({
    resolver: zodResolver(CronogramaSchema),
    defaultValues: {
      eventos: [
        {
          title: "",
          value: "",
          periodo: {
            from: new Date(),
            to: addDays(new Date(), 20),
          },
          status: "",
        },
      ],
    },
  })

  const { control, register } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "eventos",
  })

  function onSubmit(values: CronogramaFormData) {
    console.log(values)
  }

  const handleAddNew = () => {
    append({
      title: "",
      value: "",
      periodo: {
        from: new Date(),
        to: addDays(new Date(), 20),
      },
      status: "",
    })
  }

  const handleDeleteItem = (index: number) => {
    remove(index)
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function handleDiscard() {
    setIsDialogOpen(true)
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex flex-col">
        <h2 className="font-trirong italic text-4xl text-primaryScale-700 tracking-wide">
          Cronograma
        </h2>
        <div className="flex flex-row py-12 w-full ">
          <FormProvider {...form}>
            <form
              id="cronogramaForm"
              className="w-full min-h-[420px] flex flex-col gap-8 items-start"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {fields.map((field, index) => {
                return (
                  <div className={"w-full flex flex-row gap-6"} key={field.id}>
                    <div className="w-12 h-12 rounded-full gradient-button flex flex-row items-center justify-center text-white font-semibold text-xl">
                      {index + 1}
                    </div>

                    <div className="w-full flex flex-col gap-4">
                      <Input
                        {...register(`eventos.${index}.title`)}
                        placeholder={`Evento ${(index + 1)
                          .toString()
                          .padStart(2, "0")}`}
                      />
                      <Textarea
                        {...register(`eventos.${index}.value`)}
                        placeholder="Descrição do evento"
                      />
                      <div className="flex flex-row gap-8">
                        <Form {...form}>
                          <FormField
                            control={form.control}
                            name={`eventos.${index}.periodo`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-full">
                                <FormLabel>Período</FormLabel>
                                <DatePickerWithRange
                                  className="w-full"
                                  value={field.value}
                                  onDateChange={field.onChange}
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`eventos.${index}.status`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Status</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12 w-full">
                                      <SelectValue placeholder="Selecione um status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Não Iniciado">
                                      Não Iniciado
                                    </SelectItem>
                                    <SelectItem value="Em andamento">
                                      Em andamento
                                    </SelectItem>
                                    <SelectItem value="Concluido">
                                      Concluído
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </Form>
                      </div>
                    </div>
                    {index >= 1 && (
                      <Button
                        title="Excluir item da lista"
                        type="button"
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => handleDeleteItem(index)}
                      >
                        <Trash
                          size={24}
                          weight="bold"
                          className="text-destructive "
                        />
                      </Button>
                    )}
                  </div>
                )
              })}
              <AddNewButton onClick={handleAddNew} />
            </form>
          </FormProvider>
        </div>
        <div className="w-full flex justify-end items-center gap-8">
          <Button
            variant={"ghost"}
            type="button"
            className="font-semibold text-lg"
            size={"lg"}
            onClick={handleDiscard}
          >
            Descartar
          </Button>
          <Button
            data-formid="cronogramaForm"
            form="cronogramaForm"
            type="submit"
            size={"lg"}
          >
            Próxima Etapa
          </Button>
        </div>
      </div>
      <DiscardDialog />
    </AlertDialog>
  )
}
