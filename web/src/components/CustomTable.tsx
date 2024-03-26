import { AddNewButton } from './AddNewButton'

export default function CustomTable() {
  return (
    <section className="flex flex-row w-full justify-start items-start gap-4">
      <div id="customTable__column_1" className="flex-1 flex flex-col gap-4">
        <div
          id="customTable__header"
          className=" bg-zinc-600 text-zinc-50 font-semibold text-xl h-14 text-center flex items-center justify-center"
        >
          <h3>Pontos Fortes</h3>
        </div>
        <div id="customTable__items" className=" flex flex-col gap-4">
          <div className="text-center bg-zinc-200 text-black h-14 text-xl flex items-center justify-center ">
            <p>Ponto forte 1</p>
          </div>
          <div className="text-center bg-zinc-200 text-black h-14 text-xl flex items-center justify-center ">
            <p>Ponto forte 2</p>
          </div>
          <div className="text-center flex items-center justify-center ">
            <AddNewButton />
          </div>
        </div>
      </div>
      <div id="customTable__column_2" className="flex-1 flex flex-col gap-4">
        <div
          id="customTable__header"
          className=" bg-zinc-600 text-zinc-50 font-semibold text-xl h-14 text-center flex items-center justify-center"
        >
          <h3>Pontos Fortes</h3>
        </div>
        <div id="customTable__items" className="flex flex-col gap-4">
          <div className="text-center bg-zinc-200 text-black h-14 text-xl flex items-center justify-center ">
            <p>Ponto forte 1</p>
          </div>
          <div className="text-center bg-zinc-200 text-black h-14 text-xl flex items-center justify-center ">
            <p>Ponto forte 2</p>
          </div>

          <div className="text-center flex items-center justify-center ">
            <AddNewButton />
          </div>
        </div>
      </div>
    </section>
  )
}
