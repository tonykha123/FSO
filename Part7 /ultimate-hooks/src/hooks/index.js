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

export const useResource = (urlParameter) => {
  const [resources, setResources] = useState([])
  //resource is an array to start off with

  const getAll = async () => {
    const response = await axios.get(urlParameter)
    setResources(response.data)
  }

  //service.getAll() does a get request to the argument url
  //THEN SETts resources as response.data

  const create = async (resource) => {
    const response = await axios.post(urlParameter, resource)
    console.log(response)
    //posts to the argument url then sets resources to response.data
    //response object from axios is an object with alot of properties.
    //we want the data which is what we sent
    //sets the state of resources to whatever the old resource was, plus response.data
    setResources([...resources, response.data])
    //post the resource
  }

  const service = {
    create,
    getAll,
  }

  //the return value of this custom hook is like the state hook
  //the first value of the array is the resources, which returns all the data for the specific hook
  //the second is service, which allows us to manipulate all the values of the hook

  return [resources, service]
}
