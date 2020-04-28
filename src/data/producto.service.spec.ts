import { TestBed } from '@angular/core/testing';

import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: Producto.ServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Producto.ServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
