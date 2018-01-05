import { TestBed, inject } from '@angular/core/testing';

import { BoardViewResolveService } from './board-view-resolve.service';

describe('BoardViewResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardViewResolveService]
    });
  });

  it('should be created', inject([BoardViewResolveService], (service: BoardViewResolveService) => {
    expect(service).toBeTruthy();
  }));
});
