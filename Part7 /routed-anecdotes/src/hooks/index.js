import { useState } from 'react'

export const useField = (type) => {
  //useState initially sets value to an empty string
  const [value, setValue] = useState('')

  //onChange form handler, to setValue to the targeted inputs value

  const onChange = (event) => {
    setValue(event.target.value)
  }

  //returns the type of the input, value and onChange method

  return {
    type,
    value,
    onChange,
  }
}
