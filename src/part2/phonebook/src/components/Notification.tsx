import { NotificationType } from '../types/notification.types';

interface NotificationProps {
  type: NotificationType;
  message: string;
}

export default function Notification({ message, type }: NotificationProps) {
  return (
    <div id='notification' className={type}>
      {message}
    </div>
  );
}
