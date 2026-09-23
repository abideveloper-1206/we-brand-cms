const { MongoClient } = require('mongodb');

const localUri = "mongodb://127.0.0.1/we-brand-cms";
const remoteUri = "mongodb+srv://webrandmediateam_db_user:WeBrandMedia2026DB@cluster0.ibxbqll.mongodb.net/we-brand-cms?appName=Cluster0";

async function migrate() {
  console.log("Connecting to Local DB...");
  const localClient = await MongoClient.connect(localUri);
  const localDb = localClient.db("we-brand-cms");

  console.log("Connecting to Remote DB...");
  const remoteClient = await MongoClient.connect(remoteUri);
  const remoteDb = remoteClient.db("we-brand-cms");

  try {
    const collections = await localDb.listCollections().toArray();
    
    for (let colInfo of collections) {
      const colName = colInfo.name;
      
      // Skip system collections
      if (colName.startsWith('system.')) continue;
      
      console.log(`\nMigrating collection: ${colName}`);
      
      const localCollection = localDb.collection(colName);
      const remoteCollection = remoteDb.collection(colName);
      
      const docs = await localCollection.find({}).toArray();
      
      if (docs.length === 0) {
        console.log(`  -> 0 documents to migrate.`);
        continue;
      }
      
      console.log(`  -> Found ${docs.length} documents.`);
      
      // Clear remote collection before inserting to avoid duplicates
      console.log(`  -> Clearing remote collection...`);
      await remoteCollection.deleteMany({});
      
      console.log(`  -> Inserting documents into remote...`);
      await remoteCollection.insertMany(docs);
      
      console.log(`  -> Successfully migrated ${colName}.`);
    }
    
    console.log("\n✅ All collections migrated successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await localClient.close();
    await remoteClient.close();
  }
}

migrate();
