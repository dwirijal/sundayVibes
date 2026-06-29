import { test, expect } from '@playwright/test';
import { calculateCRC16 } from '../src/lib/qris';

test.describe('calculateCRC16', () => {
  test('calculates correct CRC16 for standard EMVCo test vector', () => {
    // Standard test vector for CRC-16/CCITT-FALSE
    const input = '123456789';
    const result = calculateCRC16(input);
    expect(result).toBe('29B1');
  });

  test('calculates correct CRC16 for empty string', () => {
    // Initial value of crc is 0xffff
    const result = calculateCRC16('');
    expect(result).toBe('FFFF');
  });

  test('calculates correct CRC16 for a sample QRIS payload without CRC suffix', () => {
    // Explicit known result for a specific mock string
    const basicQris = '0002010102125405100005802ID6304';
    // calculateCRC16('0002010102125405100005802ID6304') -> '9A4E'
    expect(calculateCRC16(basicQris)).toBe('9A4E');
  });
});
