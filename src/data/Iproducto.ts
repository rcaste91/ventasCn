export interface IProducto {
    productoId:number,
    productoNombre:string,
    descripcion:string,
    precio:number
}

export class Producto implements IProducto{
    
    constructor(
       public productoId: number,
       public productoNombre: string,
       public descripcion: string,
       public precio: number
    ){ }

}