export interface IPedido{
    productoId:number,
    productoNombre:string,
    cantidad:number,
    precio:number,
    total:number
}

export class Pedido implements IPedido{

    constructor(
        public productoId: number,
        public productoNombre: string,
        public cantidad: number,
        public precio: number,
        public total: number
    ){}
}