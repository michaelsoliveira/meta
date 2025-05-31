// components/ClienteTable.tsx
"use client"

import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { useAuthContext } from "@/context/auth-context"
import { Cliente } from "@/types"

export function ClienteDataTable() {
  const { client } = useAuthContext()
  const { data, isLoading } = useQuery({
    queryKey: ["clientes"],
    queryFn: async () => {
      const res = await client.get("/cliente")
      console.log(res.data)
      return res.data
    },
  })

  const columns = useMemo<ColumnDef<Cliente>[]>(() => [
    {
      header: "Tipo",
      accessorFn: row => row.pessoa.tipo,
    },
    {
      header: "Nome",
      accessorFn: row =>
        row.pessoa.tipo === "F"
          ? row.pessoa.fisica?.nome
          : row.pessoa.juridica?.nomeFantasia,
    },
    {
      header: "CPF/CNPJ",
      accessorFn: row =>
        row.pessoa.tipo === "F"
          ? row.pessoa.fisica?.cpf
          : row.pessoa.juridica?.cnpj,
    },
  ], [])

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) return <p>Carregando...</p>

  return (
    <div className="border rounded-md p-4">
      <pre>{ JSON.stringify(data, null, 2) }</pre>
      <table className="w-full text-left">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="py-2 px-4 border-b">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="py-2 px-4 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
