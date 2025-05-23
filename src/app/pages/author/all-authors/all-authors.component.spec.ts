import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAuthorsComponent } from './all-authors.component';

describe('AllAuthorsComponent', () => {
  let component: AllAuthorsComponent;
  let fixture: ComponentFixture<AllAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAuthorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
