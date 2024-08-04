export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  mail: string;
  city: string;
  address: string;
}

export interface SameProfile {
  mail: Profile | null;
  phone: Profile | null;
  name: Profile | null;
}

export interface DialogData {
  title: string;
  content?: string[];
}
