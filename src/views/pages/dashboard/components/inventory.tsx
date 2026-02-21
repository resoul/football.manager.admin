import { Link } from 'react-router-dom';
import { BadgeDot } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface InventoryRow {
  name: string;
  qty: number;
}
type InventoryRows = Array<InventoryRow>;

interface InventoryItem {
  badgeColor: string;
  label: string;
}
type InventoryItems = Array<InventoryItem>;

type InventoryProps = object;

const Inventory = ({}: InventoryProps) => {
  const items: InventoryItems = [
    { badgeColor: 'bg-green-500 size-2', label: 'Available' },
    { badgeColor: 'bg-yellow-500 size-2', label: 'Low stock' },
    { badgeColor: 'bg-destructive size-2', label: 'Out of stock' },
  ];

  const rows: InventoryRows = [
    { name: 'Nike Shift Runner', qty: 4 },
    { name: 'Puma Wace Strike', qty: 7 },
    { name: 'Adidas Xtreme High', qty: 1 },
  ];

  const renderItem = (item: InventoryItem, index: number) => {
    return (
      <div key={index} className="flex items-center gap-1.5">
        <BadgeDot className={item.badgeColor} />
        <span className="text-sm font-normal text-secondary-foreground">
          {item.label}
        </span>
      </div>
    );
  };

  const renderRow = (row: InventoryRow, index: number) => {
    return (
      <div
        key={index}
        className="flex items-center justify-between bg-accent/50 rounded-md px-4 py-2 text-sm gap-2"
      >
        <span className="text-foreground font-normal">{row.name}</span>
        <div className="flex items-center gap-3">
          <span className="text-foreground font-normal shrink-0">
            Qty: {row.qty}
          </span>
          <Separator className="bg-gray-300 h-3" orientation="vertical" />
          <Link
            to="#"
            className="hover:text-primary hover:underline hover:underline-offset-2"
          >
            Order
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="lg:px-7.5">
        <CardTitle>Inventory</CardTitle>
        <Button mode="link" underline="solid" asChild>
          <Link to="#">See All</Link>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-2 p-5 lg:p-7.5">
        <div>
          <div className="flex flex-col gap-0.5 mb-2">
            <span className="text-sm font-normal text-muted-foreground">
              Total Asset Value
            </span>
            <span className="text-3xl font-semibold text-foreground">
              $329.7k
            </span>
          </div>

          <div className="flex items-center gap-1 mb-2.5">
            <div className="bg-green-500 h-2 w-full max-w-[60%] rounded-xs"></div>
            <div className="bg-yellow-500 h-2 w-full max-w-[25%] rounded-xs"></div>
            <div className="bg-destructive h-2 w-full max-w-[15%] rounded-xs"></div>
          </div>

          <div className="flex items-center flex-wrap gap-4 mb-3.5">
            {items.map((item, index) => renderItem(item, index))}
          </div>

          <div className="flex items-center justify-between mb-0.5">
            <span className="text-foreground font-medium text-sm">
              Low stock
            </span>
            <Button mode="link" underline="solid" asChild>
              <Link to="#">See All</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {rows.map((row, index) => renderRow(row, index))}
        </div>
      </CardContent>
    </Card>
  );
};

export {
  Inventory,
  type InventoryRow,
  type InventoryRows,
  type InventoryItem,
  type InventoryItems,
  type InventoryProps,
};
