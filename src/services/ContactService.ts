import type { ContactFormData } from '../types/contact'
import { config } from '../config'

export async function sendContactForm(data: ContactFormData): Promise<void> {
    try {
        const url = `${config.api.baseUrl}/contact-requests`
        const headers = config.api.authHeaders

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        })

        let responseBody: string
        const contentType = response.headers.get('content-type')

        if (contentType && contentType.includes('application/json')) {
            const jsonData = await response.json()
            responseBody = JSON.stringify(jsonData)
        } else {
            responseBody = await response.text()
        }

        if (!response.ok) {
            let errorMessage = `Error en la petició (${response.status})`
            try {
                const errorData = JSON.parse(responseBody)
                errorMessage = errorData.message || errorData.error || errorMessage
            } catch {
                errorMessage = responseBody || response.statusText || errorMessage
            }
            throw new Error(errorMessage)
        }
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Error de connexió amb el servidor. Si us plau, verifica la configuració de la API.')
        }
        throw error
    }
}

