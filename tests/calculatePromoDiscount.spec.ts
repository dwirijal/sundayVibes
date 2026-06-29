import { test, expect } from '@playwright/test';
import { calculatePromoDiscount } from '../src/store/useCart';

test.describe('calculatePromoDiscount', () => {
  test('returns 0 when code is null or empty', () => {
    expect(calculatePromoDiscount(null, 100000)).toBe(0);
    expect(calculatePromoDiscount('', 100000)).toBe(0);
  });

  test('returns 0 when subtotal is <= 0', () => {
    expect(calculatePromoDiscount('WISUDA2026', 0)).toBe(0);
    expect(calculatePromoDiscount('WISUDA2026', -50000)).toBe(0);
  });

  test('returns 0 when code is not in dictionary', () => {
    expect(calculatePromoDiscount('INVALIDCODE', 100000)).toBe(0);
  });

  test('is case insensitive', () => {
    // WISUDA2026 is 50000 flat
    expect(calculatePromoDiscount('wisuda2026', 100000)).toBe(50000);
    expect(calculatePromoDiscount('Wisuda2026', 100000)).toBe(50000);
  });

  test.describe('flat type promo', () => {
    // WISUDA2026: { type: 'flat', value: 50000 }
    test('returns the flat value when subtotal > value', () => {
      expect(calculatePromoDiscount('WISUDA2026', 100000)).toBe(50000);
    });

    test('returns the subtotal when subtotal <= value (no negative total)', () => {
      expect(calculatePromoDiscount('WISUDA2026', 40000)).toBe(40000);
      expect(calculatePromoDiscount('WISUDA2026', 50000)).toBe(50000);
    });
  });

  test.describe('percentage type promo', () => {
    // SUNDAYVIBES: { type: 'percentage', value: 10, maxAmount: 100000 }
    // STUDENT: { type: 'percentage', value: 15, maxAmount: 50000 }

    test('calculates correct percentage discount', () => {
      // 10% of 500,000 = 50,000
      expect(calculatePromoDiscount('SUNDAYVIBES', 500000)).toBe(50000);

      // 15% of 100,000 = 15,000
      expect(calculatePromoDiscount('STUDENT', 100000)).toBe(15000);
    });

    test('floors the discount value', () => {
      // 10% of 50,005 = 5,000.5 -> 5,000
      expect(calculatePromoDiscount('SUNDAYVIBES', 50005)).toBe(5000);
    });

    test('caps discount at maxAmount', () => {
      // 10% of 2,000,000 = 200,000 > maxAmount 100,000 -> 100,000
      expect(calculatePromoDiscount('SUNDAYVIBES', 2000000)).toBe(100000);

      // 15% of 1,000,000 = 150,000 > maxAmount 50,000 -> 50,000
      expect(calculatePromoDiscount('STUDENT', 1000000)).toBe(50000);
    });
  });
});
