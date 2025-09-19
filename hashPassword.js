const bcrypt = require('bcrypt');

async function hashPasswords() {
  const passwords = ["NguyenDuy0214", "Duy2510"];
  for (const pwd of passwords) {
    const hashed = await bcrypt.hash(pwd, 10);
    console.log(`Password: ${pwd}\nHash: ${hashed}\n`);
  }
}

hashPasswords();
