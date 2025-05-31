'use client'

import { DataTable as DataTableClientes } from "@/components/ui/table/data-table";
import { useClienteTableFilters } from "./components/use-cliente-table-filters";
import { useSearchParams } from "next/navigation";
import { useClientes } from "@/hooks/use-clientes";
import { columns } from "./components/columns";

const ClienteListing = () => {
    const {
        search,
        page,
    } = useClienteTableFilters()

  const params = useSearchParams(); 
  const { data, isLoading } = useClientes({
    search,
    page: page ?? 1,
    limit: params.get('limit') ? Number(params.get('limit')) : 10,
    orderBy: 'pessoa.fisica.nome',
    order: 'asc'
  })
  const { data: clientes = [], total } = data ?? { clientes: [], total: 0 }
  if (isLoading) (<div>Carregando...</div>)
    return (
    <>
        { data && (
            <DataTableClientes
                columns={columns}
                data={clientes}
                totalItems={total}
            />
        ) }
    </>
  );
}

export default ClienteListing