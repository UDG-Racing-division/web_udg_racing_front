import type { PostsResponse, Post } from '../types/post'
import { mapAPIPostToPost } from '../types/post'
import { config } from '../config'

export class PostsService {
  static async getPosts(): Promise<Post[]> {
    try {
      const url = `${config.api.baseUrl}/posts`
      const response = await fetch(url, {
        method: 'GET',
        headers: config.api.authHeaders,
      })

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errorText = await response.text()
          if (errorText) {
            const errorData = JSON.parse(errorText)
            errorMessage = errorData.message || errorData.error || errorMessage
          }
        } catch {
        }
        throw new Error(errorMessage)
      }

      const apiResponse: PostsResponse = await response.json()

      if (apiResponse.status !== 200 || !Array.isArray(apiResponse.data)) {
        throw new Error(apiResponse.message || 'Invalid API response format')
      }

      return apiResponse.data.map(mapAPIPostToPost)
    } catch (error) {
      console.error('Error fetching posts:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Error de connexió amb el servidor. Si us plau, verifica la configuració de la API.')
      }
      throw error
    }
  }
}
