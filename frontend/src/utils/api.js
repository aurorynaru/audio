import axios from 'axios'

export const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: import.meta.env.VITE_API_URL
})

export const convertBlobUrlToFile = async (
    blobUrl,
    fileName,
    mimeType = 'image/png'
) => {
    // Fetch the blob data
    const response = await fetch(blobUrl)
    const blob = await response.blob()

    // Create a File object from the blob
    const file = new File([blob], fileName, { type: mimeType })

    return file
}
