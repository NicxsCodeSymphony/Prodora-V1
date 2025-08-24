import * as React from "react"
import { View } from "react-native"

const PortalContext = React.createContext<View | null>(null)

export function PortalHost() {
  return <View />
}

export function Portal({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
