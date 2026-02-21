import { MenuConfig, MenuItem } from '@/config/types';
import { MegaMenuFooter, MegaMenuSubDefault } from './components';

const MegaMenuSubProfiles = ({ items }: { items: MenuConfig }) => {
  const publicProfilesItem = items[1];

  return (
    <div className="w-full gap-0 lg:w-[875px]">
      <div className="pt-4 pb-2 lg:p-7.5">
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-10">
          {publicProfilesItem.children?.map((item: MenuItem, index) => {
            return (
              <div key={`profile-${index}`} className="flex flex-col">
                <h3 className="text-sm text-foreground font-semibold leading-none ps-2.5 mb-2 lg:mb-4">
                  {item.title}
                </h3>
                <div className="grid lg:grid-cols-2 lg:gap-5">
                  {item.children?.map((item: MenuItem, index) => {
                    return (
                      <div key={`profile-sub-${index}`} className="space-y-0.5">
                        {item.children && MegaMenuSubDefault(item.children)}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MegaMenuFooter />
    </div>
  );
};

export { MegaMenuSubProfiles };
