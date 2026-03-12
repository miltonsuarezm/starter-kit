import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { Button } from './button';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import HamburgerSVG from './icons/svgs/HamburgerSVG';
import { LinkedinSVG, RssSVG, XSVG } from './icons';
import { PublicationLogo } from './publication-logo';
import PublicationSidebar from './sidebar';
import Link from 'next/link';

function hasUrl(
    navbarItem: PublicationNavbarItem,
  ): navbarItem is PublicationNavbarItem & { url: string } {
    return !!navbarItem.url && navbarItem.url.length > 0;
}

export const Header = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>();
    const { publication } = useAppContext();
    const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
    const visibleItems = navbarItems.slice(0, 3);
    const hiddenItems = navbarItems.slice(3);

    const toggleSidebar = () => {
          setIsSidebarVisible((prevVisibility) => !prevVisibility);
    };

    const navList = (
          <ul className="flex flex-row items-center gap-2 text-white">
            {visibleItems.map((item) => (
                    <li key={item.url}>
                              <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-200 block max-w-[200px] truncate text-ellipsis whitespace-nowrap rounded-full p-2 transition-colors hover:bg-slate-800 hover:text-white"
                                          >
                                {item.label}
                              </a>a>
                    </li>li>
                  ))}
            {hiddenItems.length > 0 && (
                    <li>
                              <DropdownMenu.Root>
                                          <DropdownMenu.Trigger asChild>
                                                        <button className="transition-200 block rounded-full p-2 transition-colors hover:bg-slate-800 hover:text-white">
                                                                        More
                                                        </button>button>
                                          </DropdownMenu.Trigger>DropdownMenu.Trigger>
                                          <DropdownMenu.Portal>
                                                        <DropdownMenu.Content
                                                                          className="w-48 rounded border border-neutral-700 bg-neutral-900 text-white shadow-md"
                                                                          align="end"
                                                                          sideOffset={5}
                                                                        >
                                                          {hiddenItems.map((item) => (
                                                                                            <DropdownMenu.Item asChild key={item.url}>
                                                                                                                <a
                                                                                                                                        href={item.url}
                                                                                                                                        target="_blank"
                                                                                                                                        rel="noopener noreferrer"
                                                                                                                                        className="transition-200 block truncate p-2 transition-colors hover:bg-neutral-800 hover:text-white"
                                                                                                                                      >
                                                                                                                  {item.label}
                                                                                                                  </a>a>
                                                                                              </DropdownMenu.Item>DropdownMenu.Item>
                                                                                          ))}
                                                        </DropdownMenu.Content>DropdownMenu.Content>
                                          </DropdownMenu.Portal>DropdownMenu.Portal>
                              </DropdownMenu.Root>DropdownMenu.Root>
                    </li>li>
                )}
          </ul>ul>
        );
  
    return (
          <header className="border-b border-neutral-800 bg-neutral-950">
                <Container className="px-5 py-4">
                        <div className="flex flex-row items-center justify-between">
                          {/* Left: hamburger (mobile) + logo */}
                                  <div className="flex flex-row items-center gap-3">
                                              <div className="lg:hidden">
                                                            <Button
                                                                              type="outline"
                                                                              label=""
                                                                              icon={<HamburgerSVG className="h-5 w-5 stroke-current" />}
                                                                              className="rounded-xl border-transparent !px-3 !py-2 text-white hover:bg-slate-800"
                                                                              onClick={toggleSidebar}
                                                                            />
                                                {isSidebarVisible && (
                            <PublicationSidebar navbarItems={navbarItems} toggleSidebar={toggleSidebar} />
                          )}
                                              </div>div>
                                              <div className="flex items-center gap-2">
                                                            <PublicationLogo />
                                              </div>div>
                                  </div>div>
                        
                          {/* Right: nav + social links + CTA */}
                                  <div className="flex flex-row items-center gap-3 text-slate-300">
                                              <nav className="hidden lg:block">{navList}</nav>nav>
                                  
                                    {/* FOLLOW label */}
                                              <span className="hidden text-xs font-semibold uppercase tracking-widest text-slate-400 lg:block">
                                                            Follow
                                              </span>span>
                                  
                                    {/* Social icons */}
                                              <div className="hidden flex-row items-center gap-1 lg:flex">
                                                {publication.links?.twitter && (
                            <a
                                                href={publication.links.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Twitter"
                                                className="flex items-center justify-center rounded-full border border-neutral-700 p-2 hover:bg-neutral-800"
                                              >
                                              <XSVG className="h-4 w-4 stroke-current" />
                            </a>a>
                                                            )}
                                                {publication.links?.linkedin && (
                            <a
                                                href={publication.links.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="LinkedIn"
                                                className="flex items-center justify-center rounded-full border border-neutral-700 p-2 hover:bg-neutral-800"
                                              >
                                              <LinkedinSVG className="h-4 w-4 stroke-current" />
                            </a>a>
                                                            )}
                                                            <Link
                                                                              prefetch={false}
                                                                              href="/rss.xml"
                                                                              target="_blank"
                                                                              rel="noopener noreferrer"
                                                                              aria-label="RSS Feed"
                                                                              className="flex items-center justify-center rounded-full border border-neutral-700 p-2 hover:bg-neutral-800"
                                                                            >
                                                                            <RssSVG className="h-4 w-4 stroke-current" />
                                                            </Link>Link>
                                              </div>div>
                                  
                                    {/* CTA button */}
                                              <Button
                                                              href={baseUrl}
                                                              as="a"
                                                              type="primary"
                                                              label="Join Newsletter"
                                                            />
                                  </div>div>
                        </div>div>
                
                  {/* Subtitle below logo - visible on all screens */}
                  {publication.descriptionSEO && (
                      <p className="mt-1 text-sm text-slate-400">{publication.descriptionSEO}</p>p>
                        )}
                </Container>Container>
          </header>header>
        );
};</ul>
