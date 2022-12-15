
export interface EditorData {
  time: number;
  blocks: any[];
  version: string;
}

export interface Article {
  title: string;
  description: string;
  body: EditorData;
  tags: string[];
  path: string;
  author: string;
  published: boolean;
}
