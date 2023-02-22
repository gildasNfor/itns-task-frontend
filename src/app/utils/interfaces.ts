export interface Canal {
  id: string;
  name: string;
  disabled: boolean;
}

export interface Besoin {
  id: string;
  date: string;
  description: string;
  status: string;
  offre: string;
  date_envoi: string;
  date_rappel: string;
  file_present: boolean;
}

export interface statusType {
  id: number;
  value: string;
}
