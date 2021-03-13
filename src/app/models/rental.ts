import { Time } from "@angular/common";

export interface Rental{
    rentalId:number,
    brandName:string,
    firstName: string,
    lastName:string,
    rentDate:Time,
    returnDate:Time
}