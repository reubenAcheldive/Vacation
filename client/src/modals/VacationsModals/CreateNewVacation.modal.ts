export interface CreateNewVacation {
  isAdministrator: boolean | number;
    jwt?: string;
    description: string;
    checkIn: string;
    checkOut: string;
    price: number;
    img: string;
    destination:string
  }