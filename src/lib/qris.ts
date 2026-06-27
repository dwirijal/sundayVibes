/**
 * Utility to convert static QRIS to dynamic QRIS by injecting amount.
 * Based on QRIS TLV (Tag-Length-Value) structure.
 */

// CRC16 CCITT (0x1021) algorithm used by QRIS
export function calculateCRC16(str: string): string {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
}

export function generateDynamicQRIS(qrisString: string, amount: number): string {
  // Validate QRIS string: must be non-empty and contain the country code tag "5802ID".
  if (typeof qrisString !== "string" || !qrisString.includes("5802ID")) {
    throw new Error("Invalid QRIS string: must contain \"5802ID\"");
  }

  // Validate amount: finite, positive integer, capped at Rp 1 miliar.
  if (
    !Number.isFinite(amount) ||
    !Number.isInteger(amount) ||
    amount <= 0 ||
    amount > 1_000_000_000
  ) {
    throw new Error("Invalid amount: must be positive integer");
  }

  // Remove the old CRC (last 4 chars) and the CRC tag/length ("6304")
  // Note: The QRIS string always ends with '6304' followed by the 4 character CRC.
  let qrisWithoutCrc = qrisString.slice(0, -8);
  
  // Find tag '01' (Point of Initiation Method) and change its value to '12' (Dynamic)
  // Usually it is "010211" -> Tag 01, Length 02, Value 11 (Static)
  qrisWithoutCrc = qrisWithoutCrc.replace("010211", "010212");
  
  // Prepare the amount payload
  // Tag '54' is Transaction Amount
  const amountStr = amount.toString();
  const amountLength = amountStr.length.toString().padStart(2, "0");
  const amountPayload = `54${amountLength}${amountStr}`;
  
  // Insert the amount payload right before tag 58 (Country Code)
  // According to EMVCo specs, tag 54 must come before 58.
  if (qrisWithoutCrc.includes("5802ID")) {
    const parts = qrisWithoutCrc.split("5802ID");
    qrisWithoutCrc = `${parts[0]}${amountPayload}5802ID${parts[1]}`;
  } else {
    // Fallback if 5802ID is not found, just append before CRC
    qrisWithoutCrc += amountPayload;
  }
  
  // Add back the CRC tag and length
  const payloadToCalculate = qrisWithoutCrc + "6304";
  
  // Calculate new CRC
  const newCrc = calculateCRC16(payloadToCalculate);
  
  return payloadToCalculate + newCrc;
}
