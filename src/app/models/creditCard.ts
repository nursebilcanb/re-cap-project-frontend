export interface CreditCard{
    cardId:number;
    customerId:number;
    cardNumber:string;
    cardCvv:string; 
    expirationDate:string;
    nameOnTheCard:string;
    moneyInTheCard?:number;
}