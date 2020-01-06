import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NeighbourPage } from './neighbour.page';

describe('NeighbourPage', () => {
  let component: NeighbourPage;
  let fixture: ComponentFixture<NeighbourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeighbourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NeighbourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
