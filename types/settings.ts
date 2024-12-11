export interface RestaurantSettings {
  name: string;
  email: string;
  phone: string;
  address: string;
  description?: string;
  openingHours?: string;
  notifyEmail: boolean;
  notifySMS: boolean;
}

export interface NotificationSettings {
  notifyEmail: boolean;
  notifySMS: boolean;
}