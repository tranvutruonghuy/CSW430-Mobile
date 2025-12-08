export interface Service {
  _id: string;
  name: string;
  price: number;
  creator?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  _id: string;
  name: string;
  phone: string;
  totalMoney?: number;
  type?: string; // Guest / Member
  createdAt?: string;
  updatedAt?: string;
  transactions?: any[]; // optional, depending on your API
}

export interface Transaction {
  _id: string;
  code?: string;
  createdAt?: string;
  customerName?: string;
  customerPhone?: string;
  status?: string;
  amount?: number;
  discount?: number;
  totalPayment?: number;
  services?: { name?: string; quantity?: number; price?: number }[];
}

export type RootStackParamList = {
  Login: undefined;
  MainTabs: { screen?: keyof MainTabParamList } | undefined;

  // Service screens
  Home: undefined;
  AddService: undefined;
  ServiceDetail: { id: string };
  EditService: { service: Service };
  DeleteService: { id: string };

  // Transaction screens
  Transaction: undefined;
  TransactionDetail: { id: string };
  AddTransaction: undefined;
  DeleteTransaction: { id: string };

  // Customer screens
  Customer: undefined;
  AddCustomer: undefined;
  CustomerDetail: { id: string };
  EditCustomer: { customer: Customer };
  DeleteCustomer: { id: string };

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
