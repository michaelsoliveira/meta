'use client'

import { createRef, Fragment, SVGProps, useCallback, useContext, useEffect, useState, forwardRef, JSX, } from 'react'
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Logo from '../logo'
import { Link } from '../link'
import { MenuIcon, XIcon } from 'lucide-react'

type SubMenuType = {
        name?: string,
        description?: string,
        href?: string,
        subMenuItems?: SubMenuType[],
        icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
        faIcon?: boolean;
    }
    type NavigationType = {
        name: string,
        href: string,
        current: boolean,
        visible: boolean,
        subMenuItems?: SubMenuType[]
    }

export default function Navigation({ defaultNavigation, userNavigation }: any) {
    const { data: session } = useSession() as any
    const pathname = usePathname()
    const [ menuOpened, setMenuOpened ] = useState(false)
    const animation = false

    const [navigation, setNavigation] = useState<NavigationType[]>(defaultNavigation)
    const [sticky, setSticky] = useState(false)

    const handleScroll = () => {
        if (scrollY > 72) {
          setSticky(true);
        } else if (scrollY < 72) {
          setSticky(false);
        }
    }

    useEffect(() => {
        addEventListener('scroll', handleScroll)

        return () => {
            removeEventListener('scroll', handleScroll)
        }
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const changeCurrentParent = useCallback((key: any, href?: string) =>  {        
        const changeCurrentNav = defaultNavigation.map((nav: any, index: any) => {
            if (key !== index) {
                return {
                    ...nav,
                    current: false
                }
            } else {
                return {
                    ...nav,
                    current: true
                }
            }
            
        })
        
        setNavigation(changeCurrentNav)
        //if (href) router.push(href)
    }, [defaultNavigation])

    const checkCurrentNavigation = useCallback(() => {
            defaultNavigation?.map((nav: NavigationType, indexParent: number) => {
                if (nav?.subMenuItems) {
                    if (pathname === nav.href) {
                        return changeCurrentParent(indexParent)
                    }
                    nav?.subMenuItems?.map((subMenu: SubMenuType, indexSub: number) => {
                        if (pathname === subMenu.href) {
                            return changeCurrentParent(indexParent)
                        }

                        subMenu.subMenuItems?.map((subsubMenu: SubMenuType, indexSubsub: number) => {
                            if (pathname === subsubMenu.href) {
                                return changeCurrentParent(indexParent)
                            }
                        })
                    })
                }
            })
        
    }, [changeCurrentParent, defaultNavigation, pathname])

    const loadNavigation = useCallback(async() => {
        if (session) {
            checkCurrentNavigation()
        }
    }, [checkCurrentNavigation, session]) 
    

    useEffect(() => {
        let isLoaded = false
        if (!isLoaded)
            loadNavigation()

        return () => {
            isLoaded = true
        }

    }, [loadNavigation])

    return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between h-16 w-full">
              <div className="flex items-center md:justify-start md:w-1/2">
                <Link href="/">
                  <span className="text-xl font-bold text-green-700">Logo</span>
                </Link>
              </div>

              {/* Menu Desktop */}
              <div className="hidden md:flex md:items-center md:space-x-4 w-full">
                {navigation.map((item) =>
                  !item.subMenuItems ? (
                    <Link key={item.name} href={item.href}>
                      <span className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium">
                        {item.name}
                      </span>
                    </Link>
                  ) : (
                    <Popover key={item.name} className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                            {item.name}
                            <ChevronDownIcon
                              className={`ml-1 h-4 w-4 transition-transform ${
                                open ? 'transform rotate-180' : ''
                              }`}
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
                              <div className="py-1">
                                {item.subMenuItems?.map((subItem: any) => (
                                  <Link key={subItem.name} href={subItem.href}>
                                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                      {subItem.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  )
                )}
                </div>
                <div className='hidden md:flex'>
                  {session && (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                          <Menu.Button className="rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              { (session.user?.image) 
                                  ? (
                                      <img className="h-8 w-10 rounded-full" src={session.user?.image} alt="" />
                                  )
                                  : (
                                      <div className='ml-auto bg-gray-300 flex-shrink-0 p-1 rounded-full'>
                                          <UserIcon className="block h-6 w-6 text-black" aria-hidden="true" />
                                      </div>
                                  )
                              }
                          </Menu.Button>
                      </div>
                      <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                      >
                          <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-48 shadow-lg py-1 bg-white focus:outline-none rounded-md">
                          {userNavigation.map((item: any, key: any) => (
                              <Menu.Item key={key}>
                              {({ active }) => (
                                  <Disclosure.Button
                                  as='a'
                                  href={item.href}
                                  className={cn(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                          onClick={item.click}
                                          aria-hidden="true"
                                  >
                                  {item.name}
                                  </Disclosure.Button>
                              )}
                              </Menu.Item>
                          ))}
                          </Menu.Items>
                          
                      </Transition>
                    </Menu>
                  )}
              </div>
              <div className="flex items-center md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 focus:outline-none">
                  <span className="sr-only">Abrir menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          {/* Menu Mobile */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) =>
                !item.subMenuItems ? (
                  <Link key={item.name} href={item.href}>
                    <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-100">
                      {item.name}
                    </span>
                  </Link>
                ) : (
                  <Disclosure key={item.name} as="div" className="space-y-1">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="w-full flex items-center justify-between px-3 py-2 text-left text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-md">
                          <span>{item.name}</span>
                          <ChevronDownIcon
                            className={`ml-2 h-5 w-5 transition-transform ${
                              open ? 'transform rotate-180' : ''
                            }`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1 pl-5">
                          {item.subMenuItems?.map((subItem: any) => (
                            <Link key={subItem.name} href={subItem.href}>
                              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-100">
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              )}
            </div>
            {
            //Mobile
            session ? (
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            {session && session.user?.image ? (
                                <img className="h-10 w-10 rounded-full" src={session.user?.image} alt="" />
                            ) : (
                                <div className='ml-auto bg-gray-300 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                                    <UserIcon className="block h-6 w-6 text-black" aria-hidden="true" />
                                </div>
                            )}
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-gray-700">{session && session.user?.name}</div>
                            <div className="text-sm font-medium leading-none text-gray-600">{session && session.user?.email}</div>
                        </div>
                  </div>
                <div className="mt-3 px-2 space-y-1" aria-hidden="true">
                    {userNavigation.map((item: any, key: any) => (
                        <Disclosure.Button
                            key={key}
                            as={Link}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-green-700"
                            onClick={item.click}
                            aria-hidden="true"
                        >
                            {item.name}
                        </Disclosure.Button>
                    ))}
                </div>
            </div>
            ) : (
                <div className="px-3 pb-2 -mt-1">
                    <Link href="/login" className="block px-2 py-2 rounded-md text-base text-gray-700 hover:text-white hover:bg-green-700 hover:transition-all">Login</Link>            
                </div>            
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
