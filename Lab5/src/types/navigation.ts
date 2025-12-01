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
  MainTabs: undefined;

  // Service screens
  Home: undefined;
  AddService: undefined;
  ServiceDetail: { id: string };
  EditService: { service: Service };
  DeleteService: { id: string };

  // Transaction screens
  Transaction: undefined;
  TransactionDetail: { id: string }; // _id from backend

  // Customer screens
  Customer: undefined;
  AddCustomer: undefined;

  // Setting
  Setting: undefined;
};


// Bottom tab navigator routes
export type MainTabParamList = {
  Home: undefined;
  Transaction: undefined;
  Customer: undefined;
  Setting: undefined;
};