import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/data/producto.service';
import { IProducto, Producto } from 'src/data/Iproducto';
import { Observable } from 'rxjs';
import { IPedido, Pedido } from 'src/data/Ipedido';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  errorMensaje: string;
  productos: IProducto[]=[];
  pedidos: IPedido[]=[]

  prodElegido:string;
  precioElegido:number;
  cantidad:number=1;
  totalPedido:number;
  totalVenta:number=0;


  items: Array<any>;

  constructor(private productoServicio: ProductService) { }

  ngOnInit(): void {

    this.productoServicio.getUsers().subscribe(
      result=> {
        this.items=result;
        this.items.forEach(element => {
          this.productos.push(new Producto(
            element.payload.doc.data().productoId,
            element.payload.doc.data().productoNombre,
            element.payload.doc.data().descripcion,
            element.payload.doc.data().precio
          ));
        });
      });

  }

  selectProducto(productoElegido:string, precElegido:number):void{

    this.prodElegido=productoElegido;
    this.precioElegido=precElegido;
    this.cantidad=1;
    this.totalPedido=0;
  }

  resetProducto():void{
    this.precioElegido=0;
    this.cantidad=1;
    this.totalPedido=0;
  }

  agregarProducto():void{

    let totalPedidoAgregado =(this.precioElegido*this.cantidad).toFixed(2);
    this.totalPedido = parseFloat(totalPedidoAgregado);
    this.pedidos.push(
      new Pedido(
        1,
        this.prodElegido,
        this.cantidad,
        this.precioElegido,
        this.totalPedido
      )
    );
    this.totalVenta+=this.totalPedido;
    
  }

  eliminarPedido(pedidoEliminar:number):void{
    
    //elimina la fila seleccionada
    let index= pedidoEliminar;
    if(index != -1){
      this.totalVenta= this.totalVenta - this.pedidos[pedidoEliminar].total;
      this.pedidos.splice(index,1);
    }

    this.resetProducto();

  }

  calcularTotalProducto():void{

    if(this.precioElegido != null){
      let totalPedidoAgregado =(this.precioElegido*this.cantidad).toFixed(2);
    this.totalPedido = parseFloat(totalPedidoAgregado);
    }
    
  }


}