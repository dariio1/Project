import { TestBed } from '@angular/core/testing';

import { FavoriteserviceService } from './favoriteservice.service';

describe('FavoriteserviceService', () => {
  let service: FavoriteserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});