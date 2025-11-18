import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { chat } from '@/routes';
import characters from '@/routes/characters';
import departments from '@/routes/departments';
import seasons from '@/routes/seasons';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ClapperboardIcon,
    DramaIcon,
    FilmIcon,
    GithubIcon,
    GlobeIcon,
    HeartHandshakeIcon,
    LaughIcon,
    LayersIcon,
    MapPinHouseIcon,
    MessageCircleXIcon,
    MessagesSquareIcon,
    PopcornIcon,
    QuoteIcon,
    UserCheckIcon,
    UsersIcon,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Chat',
        href: chat(),
        icon: MessagesSquareIcon,
    },
    {
        title: 'Characters',
        href: characters.index(),
        icon: UsersIcon,
    },
    {
        title: 'Roles',
        href: '/todo',
        icon: UserCheckIcon,
    },
    {
        title: 'Actors',
        href: '/todo',
        icon: DramaIcon,
    },
    {
        title: 'Seasons',
        href: seasons.index(),
        icon: FilmIcon,
    },
    {
        title: 'Episodes',
        href: '/todo',
        icon: ClapperboardIcon,
    },
    {
        title: 'Departments',
        href: departments.index(),
        icon: LayersIcon,
    },
    {
        title: 'Branches',
        href: '/todo',
        icon: MapPinHouseIcon,
    },
    {
        title: 'Pranks',
        href: '/todo',
        icon: LaughIcon,
    },
    {
        title: 'Relationships',
        href: '/todo',
        icon: HeartHandshakeIcon,
    },
    {
        title: 'Quotes',
        href: '/todo',
        icon: QuoteIcon,
    },
    {
        title: 'Things She Said',
        href: '/todo',
        icon: MessageCircleXIcon,
    },
    {
        title: 'Cold Opens',
        href: '/todo',
        icon: PopcornIcon,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/isaiahpfisher/office',
        icon: GithubIcon,
    },
    {
        title: 'Dunderpedia Wiki',
        href: 'https://theoffice.fandom.com/wiki/Main_Page',
        icon: GlobeIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={chat()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
            </SidebarFooter>
        </Sidebar>
    );
}
