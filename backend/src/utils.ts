export function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

export function isValidUrl(url:string) {
    const urlRegex = /^(?:(ftp|http|https):\/\/)?[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
  }