'use client'

import { ReactNode, useCallback, useContext, useEffect } from "react"
import Footer from './footer'
import { useSession, signOut } from "next-auth/react"
import { custodia, estatistica, inventario, planejamento, reports, resources, solutions } from "./menus"
import { AuthContext } from "@/context/auth-context"
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import Navigation from "./navigation"
export type props = {
    children: ReactNode
}

const Layout = ({ children }: props) => {
    const { data: session, status } = useSession()
    const user = session?.user
    const { client } = useContext(AuthContext)

    const defaultNavigation = [
        { name: 'Cadastro', href: '#', current: false, subMenuItems: resources },
        { name: 'Soluções', href: '#', current: false, subMenuItems: solutions },
        { name: 'Relatórios', href: '#', current: false, subMenuItems: reports }
    ]

    const userNavigation = [
        { name: `Perfil (${user?.username})`, href: '#' },
        { name: 'Alterar Senha', href: '/user/change-password' },
        { name: 'Logout', href: '#', click: () => signOut({ callbackUrl: "/" }) },
    ]

    return (
        <>    
            <div className="flex flex-col">
                { session && (
                    <Navigation
                        defaultNavigation={defaultNavigation}
                        userNavigation={userNavigation}
                    />
                ) }
                
                <div className="relative">
                    {children}
                </div>
                <div>
                    <Footer />
                </div>
                
            </div>
        </>
    )
}

export default Layout