/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spotifyUrl]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spotifyDisplayName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "spotifyDisplayName" TEXT NOT NULL,
ADD COLUMN     "spotifyUrl" TEXT;

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "collaborative" BOOLEAN NOT NULL,
    "href" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "primaryColor" TEXT,
    "snapshotId" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "tracksHref" TEXT NOT NULL,
    "tracksTotal" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "height" INTEGER,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "playlistId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trackId" TEXT,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "totalTracks" INTEGER NOT NULL,
    "albumType" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discNumber" INTEGER NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "episode" BOOLEAN NOT NULL,
    "explicit" BOOLEAN NOT NULL,
    "isLocal" BOOLEAN NOT NULL,
    "popularity" INTEGER NOT NULL,
    "previewUrl" TEXT,
    "trackNumber" INTEGER NOT NULL,
    "albumId" TEXT NOT NULL,
    "availableMarkets" TEXT[],
    "playlistId" TEXT,
    "externalUrlsId" TEXT NOT NULL,
    "externalIdsId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalUrls" (
    "id" TEXT NOT NULL,
    "spotify" TEXT NOT NULL,

    CONSTRAINT "ExternalUrls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalIds" (
    "id" TEXT NOT NULL,
    "isrc" TEXT NOT NULL,

    CONSTRAINT "ExternalIds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtistToTrack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumToArtist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_id_key" ON "Artist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Album_id_key" ON "Album"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Track_id_key" ON "Track"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalUrls_id_key" ON "ExternalUrls"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalIds_id_key" ON "ExternalIds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToTrack_AB_unique" ON "_ArtistToTrack"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToTrack_B_index" ON "_ArtistToTrack"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToArtist_AB_unique" ON "_AlbumToArtist"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToArtist_B_index" ON "_AlbumToArtist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_spotifyUrl_key" ON "User"("spotifyUrl");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_externalUrlsId_fkey" FOREIGN KEY ("externalUrlsId") REFERENCES "ExternalUrls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_externalIdsId_fkey" FOREIGN KEY ("externalIdsId") REFERENCES "ExternalIds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToTrack" ADD CONSTRAINT "_ArtistToTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToTrack" ADD CONSTRAINT "_ArtistToTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToArtist" ADD CONSTRAINT "_AlbumToArtist_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToArtist" ADD CONSTRAINT "_AlbumToArtist_B_fkey" FOREIGN KEY ("B") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
