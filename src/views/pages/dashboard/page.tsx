import { DashboardTable } from '../tables/recent-orders';
import { BestSeller } from './components/best-sellers';
import { Inventory } from './components/inventory';
import { Orders } from './components/orders';
import { ProductStock } from './components/product-stock';
import { SalesActivity } from './components/sales-activity';

export function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="grid gap-5 lg:gap-7.5">
        <div className="grid xl:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
          <Orders />
          <Inventory />
          <BestSeller />
        </div>

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
          <div className="lg:col-span-1">
            <SalesActivity />
          </div>
          <div className="lg:col-span-2">
            <ProductStock />
          </div>
        </div>
        <DashboardTable />
      </div>
    </div>
  );
}
