-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postSlug_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_catSlug_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userEmail_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_catSlug_fkey" FOREIGN KEY ("catSlug") REFERENCES "Category"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "Post"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
