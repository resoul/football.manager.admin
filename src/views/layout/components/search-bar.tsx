import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useIsMobile } from '@/hooks/use-mobile';

export function SearchBar() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" shape="circle" className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary">
            <Search className="size-4.5!" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-4" align="center">
          <div className="relative">
            <Search className="size-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 start-2" />
            <Input type="text" className="px-7" placeholder="Search shop" />
            <Badge
              className="absolute top-1/2 -translate-y-1/2 end-2 gap-1"
              variant="outline"
              size="sm"
            >
              ⌘ K
            </Badge>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  
  return (
    <div className="relative lg:w-[280px]">
      <Search className="size-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 start-2" />
      <Input type="text" className="px-7" placeholder="Search shop" />
      <Badge
        className="absolute top-1/2 -translate-y-1/2 end-2 gap-1"
        variant="outline"
        size="sm"
      >
        ⌘ K
      </Badge>
    </div>
  );
}
