import { type DataItem } from '../types.ts'

export const getData = async (url: string): Promise<DataItem[]> => {
    try {
        const res = await fetch(url)

        return await res.json()
    } catch (error) {
        console.error(`Error fetching data: ${error}`)

        throw error
    }
}

export const postData = async (url: string, data: Partial<DataItem>) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.json()
    } catch (error) {
        console.error(`Error fetching data: ${error}`)

        throw error
    }
}