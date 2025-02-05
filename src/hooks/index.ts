import { DataItem } from '../types.ts'
import { useEffect, useState } from 'react'
import { getData } from '../api'

const useData = (url: string) => {
    const [data, setData] = useState<DataItem[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await getData(url)
                setData(items)
            } catch (error) {
                console.error(`Error fetching: ${error}`)
            } finally {
                setIsLoading(el => !el)
            }
        }

        fetchData()
    }, [url]);

    return {
        data,
        setData,
        isLoading,
        setIsLoading
    }
}
export default useData