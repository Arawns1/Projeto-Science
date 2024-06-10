type value = string | number | object | Array<unknown>

export const setLocalItem = (key: string, value: value) => {
  localStorage.setItem(`SCIENCE__${key}`, JSON.stringify(value))
}

export const getLocalItem = (key: string) => {
  const item = localStorage.getItem(`SCIENCE__${key}`)
  if (item !== null) {
    return JSON.parse(item)
  }
  return null
}

export const setSessionItem = (key: string, value: value) => {
  sessionStorage.setItem(`SCIENCE__${key}`, JSON.stringify(value))
}

export const getSessionItem = (key: string) => {
  const item = sessionStorage.getItem(`SCIENCE__${key}`)
  if (item !== null) {
    return JSON.parse(item)
  }
  return null
}
