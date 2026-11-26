// Vietnamese number-to-words for currency amounts, as used on invoices and contracts.
// This file is Vietnamese by design: it is the `amountInWords` formatter of the `vi` UI locale.

const DIGITS = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const UNITS = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

function readGroupOfThree(threeDigits: number, showZeroHundred: boolean): string {
  const hundreds = Math.floor(threeDigits / 100);
  const tens = Math.floor((threeDigits % 100) / 10);
  const units = threeDigits % 10;

  if (hundreds === 0 && tens === 0 && units === 0) return '';

  let result = '';

  if (hundreds > 0 || showZeroHundred) {
    result += `${DIGITS[hundreds]} trăm `;
    if (tens === 0 && units > 0) {
      result += 'lẻ ';
    }
  }

  if (tens > 1) {
    result += `${DIGITS[tens]} mươi `;
    if (units === 1) {
      result += 'mốt ';
    } else if (units === 4) {
      result += 'tư ';
    } else if (units === 5) {
      result += 'lăm ';
    } else if (units > 0) {
      result += `${DIGITS[units]} `;
    }
  } else if (tens === 1) {
    result += 'mười ';
    if (units === 5) {
      result += 'lăm ';
    } else if (units > 0) {
      result += `${DIGITS[units]} `;
    }
  } else if (tens === 0 && units > 0) {
    result += `${DIGITS[units]} `;
  }

  return result.trim();
}

/**
 * Reads a non-negative whole amount in Vietnamese words, followed by "đồng".
 * Example: 4500000 -> "Bốn triệu năm trăm nghìn đồng"
 */
export function numberToVietnameseWords(amount: number | null | undefined): string {
  if (amount === 0) return 'Không đồng';
  if (amount === null || amount === undefined || isNaN(amount) || amount < 0) return '';

  const groups: number[] = [];
  let temp = Math.floor(amount);

  while (temp > 0) {
    groups.push(temp % 1000);
    temp = Math.floor(temp / 1000);
  }

  const parts: string[] = [];

  for (let i = groups.length - 1; i >= 0; i--) {
    const groupVal = groups[i];
    if (groupVal === 0) continue;

    const showZeroHundred = i < groups.length - 1;
    const groupText = readGroupOfThree(groupVal, showZeroHundred);

    if (groupText) {
      const unit = UNITS[i];
      parts.push(unit ? `${groupText} ${unit}` : groupText);
    }
  }

  const text = parts.join(' ').trim();
  if (!text) return '';

  return `${text.charAt(0).toUpperCase()}${text.slice(1)} đồng`;
}
