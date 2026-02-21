import { MenuConfig, MenuItem } from '@/config/types';
import { Badge } from '@/components/ui/badge';
import {
  MegaMenuFooter,
  MegaMenuSubDefault,
  MegaMenuSubHighlighted,
} from './components';

const MegaMenuSubNetwork = ({ items }: { items: MenuConfig }) => {
  const networkItem = items[3];
  const networkItemGeneral = networkItem.children
    ? networkItem.children[0]
    : {};
  const networkItemOthers = networkItem.children ? networkItem.children[1] : {};

  return (
    <div className="flex-col gap-0 w-full lg:w-[670px]">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col gap-5 lg:w-[250px] mt-2 lg:mt-0 lg:border-e lg:border-border shrink-0 px-3 py-4 lg:p-7.5 bg-accent/30">
          <h3 className="text-sm text-foreground font-semibold leading-none ps-2.5 h-3.5">
            {networkItemGeneral.title}
          </h3>
          <div className="flex flex-col">
            {networkItemGeneral.children &&
              MegaMenuSubHighlighted(networkItemGeneral.children)}
          </div>
        </div>
        <div className="pt-4 pb-2 lg:p-7.5 lg:pb-5 grow">
          <div className="grid lg:grid-cols-2 gap-5">
            {networkItemOthers.children?.map((item: MenuItem, index) => {
              return (
                <div key={`network-${index}`} className="flex flex-col gap-5">
                  <h3 className="flex items-center gap-1.5 text-sm text-foreground font-semibold leading-none ps-2.5 h-3.5">
                    {item.title}
                    {item.badge && (
                      <Badge variant="primary" size="sm" appearance="light">
                        {item.badge}
                      </Badge>
                    )}
                  </h3>
                  <div className="flex flex-col">
                    {item.children && MegaMenuSubDefault(item.children)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <MegaMenuFooter />
    </div>
  );
};

export { MegaMenuSubNetwork };
