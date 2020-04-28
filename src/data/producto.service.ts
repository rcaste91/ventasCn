import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IProducto } from './Iproducto';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn:'root'  //registers this service in the root injector available for all app
})
export class ProductService{

    private productUrl ='api/products/products.json'; //hace referencia a archivo local pero deberia apuntar a url de API 

    constructor(private http: HttpClient,private db: AngularFirestore){

    }

    getUsers(){
        return this.db.collection('/productos').snapshotChanges();
    }

    addProducto(data){
/*
        return new Promise<any>((resolve,reject)=>{
            this.db.collection('/productos').add(data).then(res=>{},err=>reject(err));
        });
        */
       return this.db.collection('/productos').add({
           productoId:data.productoId,
           productoNombre:data.productoNombre,
           descripcion:data.descripcion,
           precio:data.precio
       });
    }

    updateProducto(data, precioNew:number, descripcionNew:string){
        
        //console.log("datos "+JSON.stringify(data.payload.doc.data()));

        return this.db.collection('/productos').doc(data.payload.doc.id).set({precio:precioNew , descripcion:descripcionNew },{merge:true});
    }

    deleteProducto(data){

        return this.db.collection('/productos').doc(data.payload.doc.id).delete();
    }

    getProducts(): Observable<IProducto[]>{
        //metodo se conecta al servicio
        //tap deja ver la data pasando por servicio
        //catchError maneja errores
        return this.http.get<IProducto[]>(this.productUrl).pipe(
            tap(data => console.log('All :' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    handleError(err: HttpErrorResponse){
        //aqui es donde se maneja la excepcion de errores
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage=`An error occurred: ${err.error.message}`;
        }else{
            errorMessage=`Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}

    /*
    //subscripcion al servicio json local poner en onInit de ventas.component para probar
    this.productoServicio.getProducts().subscribe({
      next: prodServicio =>{
        this.productos=prodServicio;
        this.productos.forEach(element => {
          console.log("nombre:" + element.productoNombre);
          this.prod=element.productoNombre;
        });
      },
      error: err => this.errorMensaje = err
    });
*/