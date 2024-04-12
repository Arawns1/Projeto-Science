import HeaderUser from "./HeaderUser"

export const HeaderRightMenu = {
  Root: HeaderRightMenuRoot,
  User: HeaderUser,
}
import React, { ReactNode } from "react"

interface HeaderRightMenuRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function HeaderRightMenuRoot({ children }: HeaderRightMenuRootProps) {
  return (
    <nav className="flex items-center justify-end h-full  gap-12">
      {children}
    </nav>
  )
}
