

export type Devis = {
  id: number;
  filename: string;
  owner: string;
};

export type GlossaryEntry = {
    matching: string;
    dictEntry : {
      word: string;
      definition: string;
    }
};