'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'sonner'
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    email: z.string().email({ 
        message: 'Por favor, informe um email válido' 
    }),
    password: z.string()
    .min(3, 'A senha deve conter no mínimo 3 caracteres')
});

type UserFormValue = z.infer<typeof formSchema>;

const UserAuthForm = () => {
    const [username, setUsername] = useState<string>()
    const router = useRouter();
    const [loading, startTransition] = useTransition();
    const defaultValues = {
        email: '',
        password: ''
    }

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const onSubmit = async (data: UserFormValue) => {
        startTransition(async () => {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            })
            console.log(response)

            if (response?.error && response?.error === "CredentialsSignin") {
                toast.warning('Oops, Ocorreu um erro na autenticação', {
                    description: 'Por favor, verifique sua senha e tente novamente',
                    action: {
                        label: 'Fechar',
                        onClick: () => true
                    }
                });
                return
            }

            if (!response?.error) {
                toast.success('Login realizado com sucesso!');
                router.push('/dashboard');
            }
        })
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-2"
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className="pb-2">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Entre com o email..."
                                        disabled={loading}
                                        { ...field }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem className="pb-2">
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="*****"
                                        disabled={loading}
                                        { ...field }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={loading}
                        className='w-full hover:cursor-pointer'
                        type='submit'
                    >
                        Entrar
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default UserAuthForm