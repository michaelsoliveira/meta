import Image from 'next/image'
import UserAuthForm from './user-auth-form'

export default function SignInViewPage() {
    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-sky-900" />
                    <div className='flex flex-row items-center justify-between 
                    mx-36 space-x-2'>
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Image 
                            src={"/images/logo_unifap.png"}
                            width="800"
                            height="600"
                            style={{width:'100px', height:"auto"}}
                            alt='Logo'
                        />
                    </div>
                    <span className='text-lg z-30'>
                        INSTITUIÇÃO <br />
                        DEPARTAMENTO
                    </span>
                </div>
                <div className='relative z-20 mt-auto'>
                    <blockquote className='space-y-2'>
                        <p className='text-lg'>
                            Sistema de Gerenciamento
                        </p>
                        <footer className='text-sm'>
                            Michael Oliveira
                        </footer>
                    </blockquote>
                </div>
            </div>
            <div className='flex h-full items-center p-4 lg:p-8'>
                <div className='mx-auto flex w-full flex-col justify-center
                space-y-6 sm:w-[400px]'>
                    <div className='flex flex-col space-y-2 text-center'>
                        <h1 className='text-2xl font-semibold'>
                            Coordenação Única
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Entre com seu email e senha para ter acesso
                            ao sistema
                        </p>
                    </div>
                    <UserAuthForm />
                    <p className='px-8 text-center text-xs text-muted-foreground'>
                         
                    </p>
                </div>
            </div>
        </div>
    )
}