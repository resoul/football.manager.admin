import { SidebarHeader } from './sidebar-header';
import { SidebarMenu } from './sidebar-menu';

export function Sidebar() {
  return (
    <div
      className="sidebar bg-background lg:border-e lg:border-border lg:fixed lg:top-0 lg:bottom-0 lg:z-20 lg:flex flex-col items-stretch shrink-0"
    >
      <SidebarHeader />
      <div className="overflow-hidden">
        <div className="w-(--sidebar-default-width)">
          <SidebarMenu />
        </div>
      </div>
    </div>
  );
}
