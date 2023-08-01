export type Result<T1, T2> = {
  data?: T1;
  error?: T2;
};

export type Message = {
  message: string;
};

export type Ring = {
  id: string;
  title: string;
  description: string;
  image_url: string;
};

export type Error = {
  message: string;
  code: number;
};

export type RingResult = Result<Ring, Error>;
export type RingResultForGetAll = Result<Ring[], Error>;
export type RingResultForDelete = Result<Message, Error>;
