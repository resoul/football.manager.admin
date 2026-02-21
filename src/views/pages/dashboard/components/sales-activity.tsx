'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardToolbar } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle,
  MoreHorizontal,
  Pin,
  Settings,
  Share2,
  Trash,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function SalesActivity() {
  const performance = [
    {
      label: 'Deals Closed',
      value: 27,
      trend: 12,
      trendDir: 'up',
    },
    {
      label: 'Revenue',
      value: '$182.4k',
      trend: 6,
      trendDir: 'up',
    },
    {
      label: 'Conversion',
      value: '72%',
      trend: 3,
      trendDir: 'down',
    },
  ];
  const pipelineProgress = 76;
  const activity = [
    {
      text: 'Closed deal with FinSight Inc.',
      date: 'Today',
      state: 'secondary',
      color: 'text-green-500',
    },
    {
      text: '3 new leads added to Pipeline.',
      date: 'Yesterday',
      state: 'secondary',
      color: 'text-green-500',
    },
    {
      text: 'Follow-up scheduled.',
      date: '2 days ago',
      state: 'destructive',
      color: 'text-destructive',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <span>Staff Performance</span>
        </CardTitle>
        <CardToolbar>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TriangleAlert className="mr-2 h-4 w-4" /> Add Alert
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pin className="mr-2 h-4 w-4" /> Pin to Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardToolbar>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Q3 Performance */}
        <div>
          <div className="font-medium text-sm mb-2.5 text-muted-foreground">Q3 Performance</div>
          <div className="grid grid-cols-3 gap-2">
            {performance.map((item) => (
              <div className="flex flex-col items-start justify-start" key={item.label}>
                <div className="text-xl font-bold text-foreground">{item.value}</div>
                <div className="text-xs text-muted-foreground font-medium mb-1">{item.label}</div>

                <span
                  className={cn(
                    'flex items-center gap-0.5 text-xs font-semibold',
                    item.trendDir === 'up' ? 'text-green-500' : 'text-destructive',
                  )}
                >
                  {item.trendDir === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {item.trendDir === 'up' ? '+' : '-'}
                  {item.trend}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Pipeline Progress */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-medium text-foreground">Pipeline Progress</span>
            <span className="text-xs font-semibold text-foreground">{pipelineProgress}%</span>
          </div>
          <Progress value={pipelineProgress} className="bg-muted" indicatorClassName="bg-blue-500" />
        </div>

        <Separator />

        {/* Recent Activity */}
        <div>
          <div className="font-medium text-sm text-foreground mb-2.5">Recent Activity</div>
          <ul className="space-y-2">
            {activity.map((a, i) => (
              <li key={i} className="flex items-center justify-between gap-2.5 text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className={cn('w-3.5 h-3.5', a.color)} />
                  <span className="text-xs text-foreground truncate">{a.text}</span>
                </span>
                <Badge variant={a.state === 'secondary' ? 'secondary' : 'destructive'} size="sm">
                  {a.date}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
