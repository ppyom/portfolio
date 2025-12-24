import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { Separator } from '@/components/ui/separator';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/common/theme/theme-toggle';
import authOptions from '@/lib/auth-options';
import { sidebarItems } from '@/lib/constants/admin-sidebar-items';

import UserMenu from './user-menu';

export default async function Sidebar() {
  const session = await getServerSession(authOptions);

  return (
    <SidebarRoot>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/manage">
                <p className="text-chart-2 text-xl font-bold font-dongle tracking-tighter">
                  포트폴리오 관리자
                </p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton tooltip={item.label} asChild>
                    <Link href={item.href}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator />

      <SidebarFooter className="flex-row items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu session={session} />
          </SidebarMenuItem>
        </SidebarMenu>
        <ThemeToggle />
      </SidebarFooter>
    </SidebarRoot>
  );
}
