// Article data - empty for now as articles are managed via database
export const Articles: any[] = [];

export interface Article {
  id: string;
  name: string;
  content: string;
  link: string;
  date: string;
  provider: string;
}
