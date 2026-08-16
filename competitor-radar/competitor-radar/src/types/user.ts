export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  company?: string;
  createdAt: string;
}

export interface NotificationPreferences {
  emailAlerts: boolean;
  weeklyReport: boolean;
  onlyImportantChanges: boolean;
  instantAlerts: boolean;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpDetails extends AuthCredentials {
  name: string;
  company?: string;
}
