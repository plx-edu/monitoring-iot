import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitiesService {
  getRandNb(a: number, b: number) {
    const min = a < b ? a : b;
    const max = a > b ? a : b;

    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
