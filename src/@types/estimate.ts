// ----------------------------------------------------------------------

export type EEstimateAddress = {
  id: string;
  name: string;
  address: string;
  company: string;
  email: string;
  phone: string;
};

export type EEstimateItem = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  service: string;
};

export type EEstimate = {
  id: string;
  sent: number;
  status: string;
  totalPrice: number;
  estimateNumber: string;
  subTotalPrice: number;
  taxes: number | string;
  discount: number | string;
  estimateFrom: EEstimateAddress;
  estimateTo: EEstimateAddress;
  createDate: Date | number;
  dueDate: Date | number;
  items: EEstimateItem[];
};
