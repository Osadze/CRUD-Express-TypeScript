export interface RingAttributes {
    id: string;
    title: string;
    description: string;
    image_Url: string;
  }

export type Result<T1, T2> = {
  data?: T1;
  error?: T2;
};

export interface Message {
    code: number;
    message: string;
  }
  