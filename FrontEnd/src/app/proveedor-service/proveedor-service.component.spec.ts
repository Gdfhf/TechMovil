import { TestBed } from '@angular/core/testing';

import { ProveedorService } from './proveedor-service';

describe('ProveedorServiceComponent', () => {
  let service: ProveedorService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
