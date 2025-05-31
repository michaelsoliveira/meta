import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ClienteForm } from "./cliente-form";
import { Button } from "@/components/ui/button";
import { ClienteType } from "@/types";

type Props = {
  cliente?: ClienteType;
  trigger?: React.ReactNode;
  className?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const EditClienteDialog = ({ trigger, cliente, className, open: controlledOpen, setOpen: setControlledOpen }: Props) => {
  const [open, setOpen] = useState(false);
  const isControlled = controlledOpen !== undefined && setControlledOpen !== undefined;
  
  const actualOpen = isControlled ? controlledOpen : open;
  const actualSetOpen = isControlled ? setControlledOpen : setOpen;

  return (
    <Dialog open={actualOpen} onOpenChange={actualSetOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn(className, 'z-50')}>
        <DialogHeader>
          <DialogTitle>{cliente?.id ? 'Editar' : 'Cadastrar'} cliente</DialogTitle>
          <DialogDescription>
            {cliente?.id ? 'Atualize' : 'Cadastre'} os dados da cliente nos campos abaixo.
          </DialogDescription>
        </DialogHeader>
        <ClienteForm onClose={() => actualSetOpen(false)} defaultValues={cliente} />
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => actualSetOpen(false)}>Cancelar</Button>
          <Button form="form-cliente" type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
