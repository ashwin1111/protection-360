import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatIvrPage } from './chat-ivr.page';

describe('ChatIvrPage', () => {
  let component: ChatIvrPage;
  let fixture: ComponentFixture<ChatIvrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatIvrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatIvrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
