export  interface Order {
    id?: number
    total_money:number,
    note: string
    order_date: string,
    discount: number,
    user_id: number,
    order_list : OrderDetails[]

}


export  interface OrderDetails {
    id?: number
    name: string,
    note: string
    price: number,
    quantity: number
}

export interface OrderRespon {
    id: number,
    totalMoney: number,
    note: string,
    orderDate: string,
    discount: number,
    user: {
        id: number,
        fullName: string,
        furiganaName: string,
    }
    role: {
        id: number,
        name: string
    },
    orderDetails1: OrderDetails[]
}