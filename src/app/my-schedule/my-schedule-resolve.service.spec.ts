import { TestBed, inject } from '@angular/core/testing';

import { MyScheduleResolveService } from './my-schedule-resolve.service';

describe('MyScheduleResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyScheduleResolveService]
    });
  });

  it('should be created', inject([MyScheduleResolveService], (service: MyScheduleResolveService) => {
    expect(service).toBeTruthy();
  }));
});
