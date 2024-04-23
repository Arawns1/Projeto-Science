export interface saveCronogramaDTO {
  eventos: Evento[]
  clientId: string
}

export interface Evento {
  title: string
  value: string
  periodo: Periodo
  status: string
}

export interface Periodo {
  from: string
  to: string
}
