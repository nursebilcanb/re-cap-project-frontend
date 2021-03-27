export interface Rental{
    rentalId?:number,
    carId:number,
    customerId?:number,
    brandName:string,
    colorName:string,
    companyName:string,
    firstName: string,
    lastName:string,
    carDailyPrice:number,
    carModelYear:string,
    carDescription:string,
    rentDate:Date,
    returnDate?:Date
}