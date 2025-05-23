'use client'

import { forwardRef } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

// `LinkProps` is the combination of the MUI `LinkProps` and the Next `LinkProps`
// We wanna use the `href` prop from `next/link` so we omit it from MUI's.
export type LinkProps = NextLinkProps & {
    children: React.ReactNode;
} & Omit<NextLinkProps, 'href' | 'as' | 'passHref' | 'children'>

export const Link = forwardRef(function Link({ href, children, prefetch, replace, scroll, shallow, locale, ...props }: any, ref) {
    return (
        <NextLink 
            ref={ref}
            href={href} 
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            locale={locale}
            passHref
            {...props}
        >
           
            {children}
            
        </NextLink>
    );
})