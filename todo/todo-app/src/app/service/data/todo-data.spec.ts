import { TestBed } from '@angular/core/testing';

import { TodoData } from './todo-data';

describe('TodoData', () => {
  let service: TodoData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
