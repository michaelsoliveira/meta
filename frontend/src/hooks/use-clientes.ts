'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useClient from './use-client'

export function useClientes(params: any) {
  const client = useClient()
  return useQuery({
    queryKey: ['clientes', params],
    queryFn: async () => {
      const res = await client.get('/cliente', {
        params
      })
      return res.data
    }
  })
}

export function useCreateCondicionante() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await client.post(`/cliente`, { data })
      
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    }
  })
}

export function useUpdateCondicionante() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      clienteId,
      ...data
    }: any & { clienteId: string }) => {
      const res = await client.put(
        `/cliente/${clienteId}`, { data }
      )

      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    }
  })
}

export function useDeleteCliente() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (clienteId: string) => {
      const res = await client.delete(`/cliente/${clienteId}`)
      if (res.data?.error) {
        throw new Error(res.data.message || 'Erro ao excluir o cliente')
      }
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    }
  })
}
