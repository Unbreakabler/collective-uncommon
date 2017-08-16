import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInputOptionComponent } from './chat-input-option.component';

describe('ChatInputOptionComponent', () => {
  let component: ChatInputOptionComponent;
  let fixture: ComponentFixture<ChatInputOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInputOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInputOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
