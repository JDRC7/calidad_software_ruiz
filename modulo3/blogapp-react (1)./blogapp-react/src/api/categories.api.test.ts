// src/api/categories.api.test.ts
import { http, HttpResponse } from 'msw'
import { server } from '@/test/mocks/server'
import { createCategory, getCategories } from './categories.api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

describe('getCategories()', () => {
  it('should return the paginated items from the API', async () => {
    server.use(
      http.get(`${BASE_URL}/categories`, () => {
        return HttpResponse.json({
          success: true,
          message: 'OK',
          data: {
            items: [{ id: 'cat-1', name: 'Tech' }],
            meta: { totalItems: 1, totalPages: 1, currentPage: 1 }
          }
        })
      })
    )

    const result = await getCategories()
    expect(result.items).toHaveLength(1)
    expect(result.items[0]).toMatchObject({ id: 'cat-1', name: 'Tech' })
  })

  it('should expose pagination meta', async () => {
    server.use(
      http.get(`${BASE_URL}/categories`, () => {
        return HttpResponse.json({
          success: true,
          message: 'OK',
          data: {
            items: [{ id: 'cat-1', name: 'Tech' }],
            meta: { totalItems: 1, totalPages: 1, currentPage: 1 }
          }
        })
      })
    )

    const result = await getCategories()
    expect(result.meta).toMatchObject({ totalItems: 1, totalPages: 1, currentPage: 1 })
  })
})

describe('createCategory()', () => {
  it('should return the created category', async () => {
    // Aquí no usamos server.use, por lo tanto utiliza el mock de handlers.ts automáticamente
    const category = await createCategory({ name: 'Frontend' })
    expect(category).toMatchObject({ id: 'cat-new', name: 'Frontend' })
  })

  it('should send the payload as the request body', async () => {
    let receivedBody: unknown
    server.use(
      http.post(`${BASE_URL}/categories`, async ({ request }) => {
        receivedBody = await request.json()
        return HttpResponse.json({ 
          success: true, 
          message: 'OK', 
          data: { id: 'cat-new', name: 'Frontend' } 
        })
      }),
    )

    await createCategory({ name: 'Frontend' })
    expect(receivedBody).toEqual({ name: 'Frontend' })
  })
})