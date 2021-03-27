export interface CreditCard{
    cardId?:number;
    cardNumber:string;
    cardCvv:string; 
    expirationDate:string;
    nameOnTheCard:string;
    moneyInTheCard?:number;
}