import React from 'react'
import { ButtonProps, Button as ButtonProvider } from "@/components/ui/button"


function Button({ children, ...rest }: ButtonProps) {
  return <ButtonProvider {...rest}>{children}</ButtonProvider>
}

Button.propTypes = {}

export default Button
