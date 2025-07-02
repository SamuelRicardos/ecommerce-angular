import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesProdutoComponentComponent } from './detalhes-produto-component.component';

describe('DetalhesProdutoComponentComponent', () => {
  let component: DetalhesProdutoComponentComponent;
  let fixture: ComponentFixture<DetalhesProdutoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesProdutoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesProdutoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
