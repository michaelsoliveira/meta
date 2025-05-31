import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import ClienteListing from "@/features/cliente/cliente-listing";
import { EditClienteDialog } from "@/features/cliente/edit-cliente-dialog";
import { PlusIcon } from "lucide-react";
import { Suspense, useState } from "react";

const ClientePage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Condicionantes'
            description='Gerenciar as Condicionantes do Sistema'
          />
          <div className='space-x-2'>
            <EditClienteDialog
              className="max-w-3xl"
              open={isDialogOpen}
              trigger={
                <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="rounded-full p-4 shadow-xl"
                    >
                    <PlusIcon className="h-5 w-5 mr-2" />
                        Adicionar
                </Button>
              }
            />
          </div>
        </div>
        <Separator />
        {/* <CondicionanteTableAction /> */}
        <Suspense
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ClienteListing />
        </Suspense>
      </div>
    </PageContainer>
  );
}

export default ClientePage;