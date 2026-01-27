import fs from "fs";
import path from "path";

const directory = path.join(__dirname, "generated-articles");
const oldYear = "2025";
const newYear = "2026";

console.log(`📅 Updating JSON files from ${oldYear} to ${newYear}...`);

const files = fs.readdirSync(directory).filter((f) => f.endsWith(".json"));

console.log(`📄 Found ${files.length} JSON files`);

for (const file of files) {
  const filePath = path.join(directory, file);
  const content = fs.readFileSync(filePath, "utf-8");

  if (content.includes(oldYear)) {
    const updated = content.replace(new RegExp(oldYear, "g"), newYear);
    fs.writeFileSync(filePath, updated);
    console.log(`  ✅ Updated: ${file}`);
  } else {
    console.log(`  ⏭️  Skipped: ${file} (no ${oldYear} found)`);
  }
}

console.log(`\n🎉 Done!`);
