// Script to insert all itineraries into the database
// Usage: tsx --env-file=.env.local scripts/insert-itineraries.ts

import dbConnect from "../lib/db/mongodb";
import { ItineraryModel } from "../lib/db/models/Itinerary";
import fs from "fs";
import path from "path";

async function insertItineraries() {
  const itinerariesDir = path.join(process.cwd(), "scripts/generated-itineraries");

  if (!fs.existsSync(itinerariesDir)) {
    console.error(`Directory not found: ${itinerariesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(itinerariesDir).filter((f) => f.endsWith(".json"));
  console.log(`📂 Found ${files.length} itinerary files`);

  console.log("📦 Connecting to database...");
  await dbConnect();
  console.log("✅ Database connected\n");

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = path.join(itinerariesDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Check if itinerary already exists
      const existing = await ItineraryModel.findOne({ slug: data.slug });
      if (existing) {
        await ItineraryModel.updateOne({ slug: data.slug }, data);
        console.log(`🔄 Updated: ${data.slug}`);
        updated++;
      } else {
        await ItineraryModel.create(data);
        console.log(`✅ Created: ${data.slug}`);
        created++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
      errors++;
    }
  }

  console.log("\n📊 Summary:");
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);

  process.exit(errors > 0 ? 1 : 0);
}

insertItineraries().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
