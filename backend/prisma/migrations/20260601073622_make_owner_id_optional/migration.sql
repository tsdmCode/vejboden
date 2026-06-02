-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booth" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "products" TEXT,
    "location" TEXT,
    "openingHours" TEXT,
    "image" TEXT,
    "owner_id" INTEGER,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Booth_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Booth" ("createdAt", "id", "image", "latitude", "location", "longitude", "name", "openingHours", "owner_id", "products") SELECT "createdAt", "id", "image", "latitude", "location", "longitude", "name", "openingHours", "owner_id", "products" FROM "Booth";
DROP TABLE "Booth";
ALTER TABLE "new_Booth" RENAME TO "Booth";
CREATE UNIQUE INDEX "Booth_name_key" ON "Booth"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
