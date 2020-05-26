import axios from 'axios'
import {useState, useContext, useEffect} from 'react'
import {UserContext} from '../context/UserContext.js'

const useSearchApi = ({target, query}) => {
  const {token} = useContext(UserContext)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const api = axios.create({
    baseURL: process.env.REACT_APP_SEARCHAPI,
    headers: {
      token: token
    }
  })

  const uri = target + '?filter=' + encodeURIComponent(JSON.stringify(query))
  console.log(uri)
  useEffect(() => {
    const makeTheCall = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(target)
        setData(response.data)
        setIsLoading(false)
        setHasError(false)
      } catch (err) {
        console.log(err)
        setHasError(true)
        setIsLoading(false)
        setData([{error: err}])
      }
    }
    makeTheCall()
  }, [target, query])
  return {data, isLoading, hasError}
}

export default useSearchApi
