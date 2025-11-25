export interface Service {
  _id: string;
  name: string;
  price: number;
  creator?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddService: undefined;
  ServiceDetail: { id: string };
  EditService: { service: Service };
  DeleteService: { id: string };
};
