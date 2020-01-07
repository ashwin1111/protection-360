import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SafetyMeasuresPage } from './safety-measures.page';

describe('SafetyMeasuresPage', () => {
  let component: SafetyMeasuresPage;
  let fixture: ComponentFixture<SafetyMeasuresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafetyMeasuresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SafetyMeasuresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
