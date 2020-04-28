import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/data/producto.service';
import { IProducto, Producto } from 'src/data/Iproducto';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  items: Array<any>;
  productos: IProducto[]=[];
  productoElegido:Producto;
  showBoton:boolean=false;
  mensajeOperacion:string="";
  showMsjOperacion:boolean=false;

  
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

      this.cleanProducto();
  }

  cleanProducto():void{

    this.productoElegido = new Producto(0,"","",0);
  }

  //Encuentra ID mayor y devuelve nuevo id para nuevo producto
  generarId():number{
     
    let newId = 0;

     return newId;
  }

  //Muestra mensaje de operacion dependiendo de lo que haga
  mostrarMsj(mensaje:string, mostrar:boolean):void{

    this.mensajeOperacion=mensaje;
    this.showMsjOperacion=mostrar;
  }

  addProducto():void{

    //ordena ID de menor a mayor
    let itemsCopy = this.items;
    itemsCopy.sort(function (a,b){
      return (a.payload.doc.data().productoId)-(b.payload.doc.data().productoId);
    })
    let ultimoProducto = itemsCopy.pop();
    let nuevoIdProducto = (ultimoProducto.payload.doc.data().productoId)+1;

    //crea objeto de nuevo producto
    let newProd = new Producto(nuevoIdProducto,this.productoElegido.productoNombre,this.productoElegido.descripcion,this.productoElegido.precio);
    console.log("nuevo: " + JSON.stringify(ultimoProducto.payload.doc.data()));

    this.productoServicio.addProducto(newProd).then(res=>{
      console.log("todo bien");
    });

    this.cancelarOp();
    this.mostrarMsj("Producto Agregado",true);
  }

  selectProducto(producto):void{
  
    this.productoElegido.productoId=producto.payload.doc.data().productoId;
    this.productoElegido.productoNombre=producto.payload.doc.data().productoNombre;
    this.productoElegido.precio=producto.payload.doc.data().precio;
    this.productoElegido.descripcion=producto.payload.doc.data().descripcion;
    this.showBoton=true;
  }

  updateProducto(p):void{
    
    let itemsCopy = this.items;
    
    const found=itemsCopy.find(element =>element.payload.doc.data().productoId == p.productoId);
    console.log("enviado "+JSON.stringify(p));

    this.productoServicio.updateProducto(found,p.precio,p.descripcion);
    this.cancelarOp();
    this.mostrarMsj("Producto Actualizado",true);
  }

  deleteProducto(p):void{

    let itemsCopy = this.items;
    
    let found=itemsCopy.find(element =>element.payload.doc.data().productoId == p.productoId)

    console.log("encontrado " + JSON.stringify(found.payload.doc.id));
    this.productoServicio.deleteProducto(found);
    this.cancelarOp();
    this.mostrarMsj("Producto Eliminado",true);
  }

  cancelarOp():void{

    this.cleanProducto();
    this.showBoton=false;
    this.mostrarMsj("",false);
  }

}


