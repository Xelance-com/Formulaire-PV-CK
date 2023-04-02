import CryptoJS from 'crypto-js';
import base64url from 'base64url';

function decrypt(key, cpcValue) {
    // Handle a case where the value was *not* encrypted:
    if (!isNaN(cpcValue)) {
        return parseFloat(cpcValue)
    }
    // Handle the regular case (value *was* encrypted):
    let keyBytes = CryptoJS.enc.Hex.parse(key);
    let decrypt = CryptoJS.AES.decrypt(base64url.toBase64(decodeURIComponent(cpcValue)), keyBytes, {
        mode:
            CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7
    });
    let decryptedStr = CryptoJS.enc.Utf8.stringify(decrypt).toString();
    // 1.23_1612281007670
    let validation_regex = /^(\d)+((\.)\d+)?\_/;
    // Check that the decrypted value is valid
    if (!validation_regex.test(decryptedStr)) {
        throw 'Decrypted value is not valid!';
    }
    return parseFloat(decryptedStr.split('_')[0]);
}


let val1 = decrypt("b4d4abb5d301fcb77aa903b980561d73", "mPrWgWqVx7H1e4E3lU3JTxvZf2SfIUhb-sVUIwT65T4=");
console.log("CPC= " + val1);