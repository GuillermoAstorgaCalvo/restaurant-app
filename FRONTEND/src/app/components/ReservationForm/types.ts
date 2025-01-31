export interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

export const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: 1,
};
