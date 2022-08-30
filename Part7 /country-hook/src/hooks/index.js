import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

//useCountry custom hook takes in a name
//it then uses that name passed through to do a fetch to the api endpoint
//https://restcountries.com/v3.1/name/{name}?fullText=true
//then sets country which is initally null
//to the returned array list of countries
export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  //useEffect kicks everytime name changes as it is the depedency
  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response) => {
          setCountry(response.data[0])
        })
        .catch((err) => {
          setCountry(null)
        })
    }
  }, [name])

  return country
}
