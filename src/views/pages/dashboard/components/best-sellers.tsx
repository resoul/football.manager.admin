import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BestSellerProps = object;

interface BestSellerItem {
  logo: string;
  title: string;
  label: string;
  sku: string;
}
type BestSellerItems = Array<BestSellerItem>;

export function BestSeller({}: BestSellerProps) {
  const items: BestSellerItems = [
    {
      logo: '11.png',
      title: 'Cloud Shift Lightweight Runner Pro Edition',
      label: '$120.00',
      sku: 'BT-A1-YLW-8',
    },
    {
      logo: '12.png',
      title: 'Titan Edge High Impact Stability Lightweight..',
      label: '$99.00',
      sku: 'SNK-888-RED-42',
    },
    {
      logo: '13.png',
      title: 'Cloud Shift Lightweight Runner Pro Edition',
      label: '$120.00',
      sku: 'SD-999-TAN-38',
    },
    {
      logo: '15.png',
      title: 'Cloud Shift Lightweight Runner Pro Edition',
      label: '$149.00',
      sku: 'SD-Z9-BRN-39',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="lg:px-7.5">
        <CardTitle>Best Sellers</CardTitle>
        <Button mode="link" underline="solid" asChild>
          <Link to="#">See All</Link>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 lg:gap-7.5 p-5 lg:p-7.5">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3.5">
            <Card className="flex items-center justify-center rounded-md bg-accent/50 h-[50px] w-[60px] shadow-none shrink-0">
              <img
                src={toAbsoluteUrl(`/media/store/client/1200x1200/${item.logo}`)}
                className="cursor-pointer h-[50px]"
                alt="image"
              />
            </Card>

            <div className="flex flex-col gap-1.5 mb-1">
              <Link
                to="#"
                className="hover:text-primary text-sm font-medium text-mono leading-5.5"
              >
                {item.title}
              </Link>

              <span className="text-xs font-normal text-muted-foreground uppercase">
                sku:{' '}
                <span className="text-xs font-medium text-foreground">
                  {item.sku}
                </span>
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
