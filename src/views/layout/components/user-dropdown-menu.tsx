import {
  Bell,
  Clock,
  Download,
  ExternalLink,
  Gift,
  HelpCircle,
  Keyboard,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
  VolumeX,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { toAbsoluteUrl } from '@/lib/helpers';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarIndicator,
  AvatarStatus,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAdminAuth } from '@/providers/admin-auth-provider';

export function UserDropdownMenu() {
  const { theme, setTheme } = useTheme();
  const { email, role, logout } = useAdminAuth();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const userName = email ? email.split('@')[0] : 'Admin';
  const initials = userName.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar className="size-7">
          <AvatarImage
            src={toAbsoluteUrl('/media/avatars/300-2.png')}
            alt="@reui"
          />
          <AvatarFallback>{initials}</AvatarFallback>
          <AvatarIndicator className="-end-2 -top-2">
            <AvatarStatus variant="online" className="size-2.5" />
          </AvatarIndicator>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64"
        side="bottom"
        align="end"
        sideOffset={11}
      >
        {/* User Information Section */}
        <div className="flex items-center gap-3 p-3">
          <Avatar>
            <AvatarImage
              src={toAbsoluteUrl('/media/avatars/300-2.png')}
              alt="@reui"
            />
            <AvatarFallback>{initials}</AvatarFallback>
            <AvatarIndicator className="-end-1.5 -top-1.5">
              <AvatarStatus variant="online" className="size-2.5" />
            </AvatarIndicator>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{userName}</span>
            <span className="text-xs text-muted-foreground">{role || 'admin'}</span>
          </div>
        </div>

        <DropdownMenuItem className="cursor-pointer py-1 rounded-md border border-border hover:bg-muted">
          <Clock />
          <span>Set status</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Notification and Settings Section */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <VolumeX />
            <span>Mute notifications</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuItem>For 30 minutes</DropdownMenuItem>
            <DropdownMenuItem>For 1 hour</DropdownMenuItem>
            <DropdownMenuItem>For 4 hours</DropdownMenuItem>
            <DropdownMenuItem>Until tomorrow</DropdownMenuItem>
            <DropdownMenuItem>Until next week</DropdownMenuItem>
            <DropdownMenuItem>Custom date and time</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem>
          <User />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Bell />
          <span>Notification settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Theme Toggle */}
        <DropdownMenuItem onClick={toggleTheme}>
          {theme === 'light' ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
          <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Business-Focused Application Section */}
        <DropdownMenuItem>
          <Keyboard />
          <span>Keyboard shortcuts</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Gift />
          <span>Referrals</span>
          <Badge variant="info" appearance="light" className="ms-auto">
            New
          </Badge>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Download />
          <span>Download apps</span>
          <ExternalLink className="size-3 ms-auto" />
        </DropdownMenuItem>

        <DropdownMenuItem>
          <HelpCircle />
          <span>Help</span>
          <ExternalLink className="size-3 ms-auto" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Action Items */}
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
