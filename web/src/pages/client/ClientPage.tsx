import React from "react"
import Logo from "@/assets/science-logo-3.svg"
export default function ClientPage() {
  return (
    <div>
      <header className=" w-full h-20 gradient-button flex items-center px-16 py-8 shadow-sm">
        <img
          src={Logo}
          width={150}
          alt="Logo gradiente do azul para o verde da Science - marketing inteligente"
          className="cursor-pointer"
        />
      </header>
      <section id="heroSection" className="bg-blue-500/60 h-screen w-full ">
        <div className="flex flex-col items-center justify-center gap-10 pt-20">
          <div className="bg-gray-400 w-60 h-60 rounded-full"></div>
          <div className="flex flex-col gap-3 items-center justify-center">
            <h2 className="font-trirong text-white font-bold text-7xl tracking-wide">
              Claudio Copello
            </h2>
            <span className="font-trirong text-black/20 text-3xl tracking-wide">
              Planejamento Multicanais
            </span>
          </div>
        </div>
      </section>

      <div className="w-full px-16">
        <section id="sobreOExpert">
          <h3 className="font-trirong tracking-wide text-6xl text-green-900">
            Sobre o <br />
            <b>Expert</b>
          </h3>
        </section>
      </div>
    </div>
  )
}
