import { ClienteType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ClienteType>[] = [
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
  ]