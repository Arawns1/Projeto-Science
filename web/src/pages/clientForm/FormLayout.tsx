import { Header } from "@/components/Header/Header"
import { MultiStep } from "@/components/MultiStep"
import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { stepsPaths } from "./Paths"

export default function FormLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [activeStep, setActiveStep] = useState<number>(0)

  useEffect(() => {
    const activeStepIndex = stepsPaths.findIndex(
      (stepPath) => stepPath.path === pathname,
    )

    if (activeStepIndex === -1) {
      navigate("/novo-cliente/apresentacao")
    } else {
      setActiveStep(activeStepIndex)
    }
  }, [pathname, navigate])

  return (
    <>
      <Header.Root>
        <Header.RightMenu.Root>
          <Header.RightMenu.User />
        </Header.RightMenu.Root>
      </Header.Root>
      <div className="w-full min-h-screen my-4 flex flex-col gap-8">
        <div className="w-full flex flex-col gap-2 items-center justify-center py-8 ">
          <h1 className="text-3xl font-medium text-primaryScale-950">
            Cadastro de Novo Cliente
          </h1>
          <p className="text-base text-zinc-400">
            Preencha os campos para cadastrar um novo cliente
          </p>
        </div>
        <div className="w-5/6 mx-auto flex flex-col gap-8">
          <MultiStep.Root>
            {stepsPaths.map((stepPath, index) => (
              <MultiStep.Item
                key={stepPath.name}
                label={`${index + 1}. ${stepPath.name}`}
                isActive={index <= activeStep}
                onClick={() => navigate(stepPath.path)}
              />
            ))}
          </MultiStep.Root>

          <div className=" w-full border-2 border-zinc-200 p-10 rounded-lg ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
