import { MenuConfig, MenuItem } from '@/config/types';
import { Badge } from '@/components/ui/badge';
import {
  MegaMenuFooter,
  MegaMenuSubDefault,
  MegaMenuSubHighlighted,
} from './components';

const MegaMenuSubAuth = ({ items }: { items: MenuConfig }) => {
  const authItem = items[4];
  const authItemGeneral = authItem.children ? authItem.children[0] : {};
  const authItemOthers = authItem.children ? authItem.children[1] : {};

  return (
    <div className="flex-col gap-0 w-full lg:w-[670px]">
      <div className="flex flex-col lg:flex-row">
        <div className="pt-4 pb-2 lg:p-7.5 lg:pb-5 grow">
          <div className="grid lg:grid-cols-2 gap-5">
            {authItemGeneral.children?.map((item: MenuItem, index) => {
              return (
                <div key={`auth-${index}`} className="flex flex-col">
                  <h3 className="text-sm text-foreground font-semibold leading-none ps-2.5 mb-2 lg:mb-5">
                    {item.title}
                    {item.badge && (
                      <Badge variant="primary" size="sm" appearance="light">
                        {item.badge}
                      </Badge>
                    )}
                  </h3>
                  <div className="menu menu-default menu-fit flex-col">
                    {item.children && MegaMenuSubDefault(item.children)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:w-[250px] mb-4 lg:mb-0 lg:border-s lg:border-border shrink-0 px-3 py-4 lg:p-7.5 bg-accent/50">
          <h3 className="text-sm text-foreground font-semibold leading-none ps-2.5 mb-5">
            {authItemOthers.title}
          </h3>
          <div className="flex flex-col gap-1">
            {authItemOthers.children &&
              MegaMenuSubHighlighted(authItemOthers.children)}
          </div>
        </div>
      </div>
      <MegaMenuFooter />
    </div>
  );
};

export { MegaMenuSubAuth };
