// src/components/private/PostFormDialog.test.tsx
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostFormDialog from './PostFormDialog'

// Mock de las APIs de posts y categorías
vi.mock('@/api/posts.api', () => ({
  createPost: vi.fn(),
  updatePost: vi.fn(),
}))

vi.mock('@/api/categories.api', () => ({
  getCategories: vi.fn(),
}))

// Mock de los componentes de Shadcn UI Select para que funcionen de forma nativa en JSDOM
vi.mock('@/components/ui/select', () => {
  return {
    Select: ({ children, onValueChange, value }: any) => (
      <select 
        data-testid="select-nativo" 
        value={value} 
        onChange={(e) => onValueChange && onValueChange(e.target.value)}
      >
        {children}
      </select>
    ),
    SelectTrigger: ({ children }: any) => <>{children}</>,
    SelectValue: ({ placeholder }: any) => <option value="">{placeholder}</option>,
    SelectContent: ({ children }: any) => <>{children}</>,
    SelectItem: ({ children, value }: any) => <option value={value}>{children}</option>,
  }
})

import { createPost, updatePost } from '@/api/posts.api'
import { getCategories } from '@/api/categories.api'

const CATEGORY_ID = '11111111-1111-1111-1111-111111111111'
const onOpenChange = vi.fn()
const onSaved = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(getCategories).mockResolvedValue({
    items: [{ id: CATEGORY_ID, name: 'Tech' }],
    meta: { itemCount: 1, totalItems: 1, itemsPerPage: 100, totalPages: 1, currentPage: 1 },
  })
})

describe('PostFormDialog — creación', () => {
  it('should call createPost with the typed fields and the selected category', async () => {
    const user = userEvent.setup()
    vi.mocked(createPost).mockResolvedValue({
      id: 'post-1',
      title: 'Nuevo post',
      content: 'Contenido de prueba',
      category: { id: CATEGORY_ID, name: 'Tech' },
    })

    render(<PostFormDialog open onOpenChange={onOpenChange} post={null} onSaved={onSaved} />)

    // Esperamos a que cargue la categoría de la API
    await screen.findByRole('option', { name: 'Tech' })

    await user.type(screen.getByLabelText('Título'), 'Nuevo post')
    await user.type(screen.getByLabelText('Contenido'), 'Contenido de prueba')
    
    // Seleccionamos la opción de manera nativa y directa
    await user.selectOptions(screen.getByTestId('select-nativo'), CATEGORY_ID)
    
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    await waitFor(() =>
      expect(createPost).toHaveBeenCalledWith({
        title: 'Nuevo post',
        content: 'Contenido de prueba',
        categoryId: CATEGORY_ID,
      }),
    )
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onSaved).toHaveBeenCalled()
  })

  it('should show a validation error when no category is selected', async () => {
    const user = userEvent.setup()
    render(<PostFormDialog open onOpenChange={onOpenChange} post={null} onSaved={onSaved} />)

    await user.type(screen.getByLabelText('Título'), 'Nuevo post')
    await user.type(screen.getByLabelText('Contenido'), 'Contenido de prueba')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    // Buscamos el mensaje de error de validación de Zod
    expect(await screen.findByText('Selecciona una categoría')).toBeInTheDocument()
    expect(createPost).not.toHaveBeenCalled()
  })
})

describe('PostFormDialog — edición', () => {
  const post = {
    id: 'post-1',
    title: 'Post existente',
    content: 'Contenido viejo',
    category: { id: CATEGORY_ID, name: 'Tech' },
  }

  it('should prefill title and content when editing', async () => {
    render(<PostFormDialog open onOpenChange={onOpenChange} post={post} onSaved={onSaved} />)

    expect(await screen.findByLabelText('Título')).toHaveValue('Post existente')
    expect(screen.getByLabelText('Contenido')).toHaveValue('Contenido viejo')
    expect(screen.getByText('Editar post')).toBeInTheDocument()
  })

  it('should call updatePost with the post id, keeping the existing category', async () => {
    const user = userEvent.setup()
    vi.mocked(updatePost).mockResolvedValue({ ...post, title: 'Post editado' })

    render(<PostFormDialog open onOpenChange={onOpenChange} post={post} onSaved={onSaved} />)

    const titleInput = await screen.findByLabelText('Título')
    await user.clear(titleInput)
    await user.type(titleInput, 'Post editado')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    await waitFor(() =>
      expect(updatePost).toHaveBeenCalledWith('post-1', {
        title: 'Post editado',
        content: 'Contenido viejo',
        categoryId: CATEGORY_ID,
      }),
    )
    expect(createPost).not.toHaveBeenCalled()
  })
})