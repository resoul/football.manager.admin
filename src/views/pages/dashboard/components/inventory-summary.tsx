import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function InventorySummary() {
  const inHand = 12746;
  const toReceive = 62;
  const total = inHand + toReceive;
  const percent = (inHand / total) * 100;
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="border-0 min-h-auto pt-6 pb-4">
        <CardTitle>Inventory Summary</CardTitle>
        <div className="flex justify-end">
          <Button variant="outline" size="sm" className="font-medium">
            View Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6">
        <div className="grow space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              In Hand: <span className="font-semibold text-foreground">{inHand.toLocaleString()}</span>
            </span>
            <span className="text-base font-semibold text-foreground">{inHand.toLocaleString()}</span>
          </div>

          <div>
            <Progress value={percent} className="bg-muted" indicatorClassName="bg-green-500" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">{toReceive} items to receive</span>
            <span className="text-xs text-muted-foreground">of {total.toLocaleString()} total</span>
          </div>
        </div>

        <div className="rounded-xl bg-muted/60 px-4 py-2.5 text-xs text-muted-foreground flex items-center justify-between gap-2">
          <span>Last updated</span>
          <span className="font-medium text-foreground">Today</span>
        </div>
      </CardContent>
    </Card>
  );
}
