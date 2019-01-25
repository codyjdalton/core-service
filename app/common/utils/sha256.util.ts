/**
 * sha256.util
 */
import * as crypto from 'crypto';
export const sha256 = (x: string) => crypto.createHash('sha256')
    .update(x, 'utf8').digest('hex');