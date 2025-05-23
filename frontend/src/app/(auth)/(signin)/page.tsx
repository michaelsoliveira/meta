import SignInViewPage from "@/features/auth/components/sign-in";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Autenticação | Login',
    description: 'Página de login para autenticação'
};

export default async function Home() {
    const session = await auth();
    if (session?.user) {
        redirect('/dashboard')
    }
    return <SignInViewPage />
}