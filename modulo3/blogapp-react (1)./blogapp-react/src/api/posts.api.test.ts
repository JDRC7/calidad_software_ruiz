// src/api/posts.api.test.ts
import { http, HttpResponse } from 'msw'
import { server } from '@/test/mocks/server'
import { getPosts } from './posts.api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

describe('getPosts()', () => {
  it('should return the paginated items from the API', async () => {
    // Interceptamos la petición para devolver la estructura que espera tu cliente API
    server.use(
      http.get(`${BASE_URL}/posts`, () => {
        return HttpResponse.json({
          success: true,
          message: 'OK',
          data: {
            items: [{ id: 'post-1', title: 'Primer post', category: { name: 'Tech' } }],
            meta: { totalItems: 1, totalPages: 1, currentPage: 1 }
          }
        })
      })
    )

    const result = await getPosts()
    expect(result.items).toHaveLength(1)
    expect(result.items[0]).toMatchObject({ title: 'Primer post', category: { name: 'Tech' } })
  })

  it('should expose pagination meta', async () => {
    server.use(
      http.get(`${BASE_URL}/posts`, () => {
        return HttpResponse.json({
          success: true,
          message: 'OK',
          data: {
            items: [{ id: 'post-1', title: 'Primer post', category: { name: 'Tech' } }],
            meta: { totalItems: 1, totalPages: 1, currentPage: 1 }
          }
        })
      })
    )

    const result = await getPosts()
    expect(result.meta).toMatchObject({ totalItems: 1, totalPages: 1, currentPage: 1 })
  })
})