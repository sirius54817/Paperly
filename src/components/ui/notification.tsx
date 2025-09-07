'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X } from 'lucide-react';

interface NotificationProps {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  onDismiss?: () => void;
}

const typeConfig = {
  info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-100' },
  success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-100' },
  warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', badge: 'bg-yellow-100' },
  error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-100' }
};

export function NotificationCard({ title, message, type, timestamp, onDismiss }: NotificationProps) {
  const config = typeConfig[type];

  return (
    <Card className={`${config.bg} ${config.border}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Bell className={`h-4 w-4 ${config.text}`} />
          <CardTitle className={`text-sm ${config.text}`}>{title}</CardTitle>
          <Badge className={`${config.badge} ${config.text} text-xs`}>
            {type.toUpperCase()}
          </Badge>
        </div>
        {onDismiss && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDismiss}
            className={`h-6 w-6 p-0 ${config.text}`}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className={config.text}>
          {message}
        </CardDescription>
        <p className="text-xs text-gray-500 mt-2">{timestamp}</p>
      </CardContent>
    </Card>
  );
}

interface NotificationCenterProps {
  notifications: NotificationProps[];
  onDismiss: (index: number) => void;
}

export function NotificationCenter({ notifications, onDismiss }: NotificationCenterProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300" />
        <p>No notifications</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification, index) => (
        <NotificationCard
          key={index}
          {...notification}
          onDismiss={() => onDismiss(index)}
        />
      ))}
    </div>
  );
}