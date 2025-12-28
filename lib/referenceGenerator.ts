/**
 * Reference Number Generator
 * Generates unique reference numbers using timestamp + random hash
 * Format: MOT-YYYYMMDD-HHMMSS-XXXXX
 */

/**
 * Generate a random alphanumeric string
 */
function generateRandomHash(length: number = 5): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Format date components for reference number
 */
function formatDateComponent(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function formatTimeComponent(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}${minutes}${seconds}`;
}

/**
 * Generate a unique reference number
 * Format: MOT-YYYYMMDD-HHMMSS-XXXXX
 * Example: MOT-20241215-143052-A7B2K
 */
export function generateReferenceNumber(): string {
  const now = new Date();
  const datePart = formatDateComponent(now);
  const timePart = formatTimeComponent(now);
  const randomPart = generateRandomHash(5);
  
  return `MOT-${datePart}-${timePart}-${randomPart}`;
}

