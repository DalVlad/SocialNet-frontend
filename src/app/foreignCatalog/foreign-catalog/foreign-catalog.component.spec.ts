import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignCatalogComponent } from './foreign-catalog.component';

describe('ForeignCatalogComponent', () => {
  let component: ForeignCatalogComponent;
  let fixture: ComponentFixture<ForeignCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForeignCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForeignCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
