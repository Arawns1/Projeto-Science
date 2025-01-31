import { Trash } from "@phosphor-icons/react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { AddNewButton } from "./AddNewButton"
import SimpleListItem from "./SimpleListItem"
import { Button } from "./ui/button"

interface SimpleListProps extends React.InputHTMLAttributes<HTMLUListElement> {
  listType?: "input" | "textArea" | "both"
  name: string
  itemPlaceholder?: string
  bothTextAreaPlaceholder?: string
  hasAddNewButton?: boolean
  hasDeleteIcon?: boolean
  customIndex?: number
}

export default function SimpleList({
  listType = "input",
  name = "diagnosticos",
  itemPlaceholder = "Item",
  bothTextAreaPlaceholder,
  hasAddNewButton = true,
  hasDeleteIcon = true,
  customIndex,
}: SimpleListProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  })

  function addNew() {
    append({ value: "" })
  }
  const handleDeleteItem = (index: number) => {
    remove(index)
  }

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-6">
        {fields.map((field, index) => {
          if (customIndex) {
            index = customIndex
          }
          const errorAtIndex = (errors[name] as any)?.[index]
          return (
            <li key={field.id} className="flex flex-col gap-2">
              <div className="flex flex-row gap-8">
                <SimpleListItem
                  index={index}
                  variant={listType}
                  name={name}
                  bothTextAreaPlaceholder={bothTextAreaPlaceholder}
                  placeholder={`${itemPlaceholder} ${(index + 1)
                    .toString()
                    .padStart(2, "0")}`}
                />

                {hasDeleteIcon && index >= 1 && (
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
              {errorAtIndex?.value && (
                <span className="text-destructive">
                  {errorAtIndex?.value?.message}
                </span>
              )}
            </li>
          )
        })}
      </ul>
      {hasAddNewButton && (
        <div className="w-full flex items-center justify-start">
          <AddNewButton onClick={addNew} />
        </div>
      )}
    </div>
  )
}
