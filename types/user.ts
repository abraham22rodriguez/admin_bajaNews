export interface UserListItem {
  id: number;
  email: string;
  roles: string[];
  isEnabled: boolean;
  isVerified: boolean;
  levelId: number | null;
  profileName: string;
  profileLastName: string;
}

export interface UserDetail {
  id: number;
  email: string;
  roles: string[];
  isEnabled: boolean;
  isVerified: boolean;
  levelId: number | null;
}
