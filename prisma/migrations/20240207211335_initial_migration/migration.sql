-- CreateTable
CREATE TABLE "Thought" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "feel" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Thought_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RelatedThoughts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedThoughts_AB_unique" ON "_RelatedThoughts"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedThoughts_B_index" ON "_RelatedThoughts"("B");

-- AddForeignKey
ALTER TABLE "_RelatedThoughts" ADD CONSTRAINT "_RelatedThoughts_A_fkey" FOREIGN KEY ("A") REFERENCES "Thought"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedThoughts" ADD CONSTRAINT "_RelatedThoughts_B_fkey" FOREIGN KEY ("B") REFERENCES "Thought"("id") ON DELETE CASCADE ON UPDATE CASCADE;
