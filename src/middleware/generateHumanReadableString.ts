export function generateHumanReadableString(length:any) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charCount = characters.length;
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charCount);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }