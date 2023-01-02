-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'CLASS_REP', 'SU_EXCO', 'ADMIN', 'MODERATOR', 'PUBLISER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PUBLISHED', 'TRASHED', 'DRAFT', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "profileImgUrl" TEXT DEFAULT '',
    "regDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "ipAdress" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "facultyId" INTEGER,
    "departmentId" INTEGER,
    "bio" TEXT,
    "level" INTEGER NOT NULL DEFAULT 100,
    "whatsApp" TEXT,
    "coverImgUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("followerId","followingId")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "content" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "coverImageUrl" TEXT,
    "viwes" INTEGER DEFAULT 1,
    "categoryId" INTEGER,
    "shareCount" INTEGER DEFAULT 0,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedTopics" (
    "id" SERIAL NOT NULL,
    "SavedUserId" INTEGER NOT NULL,
    "SavedTopicId" INTEGER NOT NULL,

    CONSTRAINT "SavedTopics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topiclike" (
    "id" SERIAL NOT NULL,
    "likedTopicId" INTEGER NOT NULL,
    "likeUserId" INTEGER NOT NULL,

    CONSTRAINT "Topiclike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "topicId" INTEGER,
    "materialsId" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentLike" (
    "id" SERIAL NOT NULL,
    "likedUserId" INTEGER NOT NULL,
    "commentsId" INTEGER NOT NULL,

    CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "commentsId" INTEGER,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplyLike" (
    "id" SERIAL NOT NULL,
    "likeUserId" INTEGER NOT NULL,
    "replysId" INTEGER NOT NULL,

    CONSTRAINT "ReplyLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "viwes" INTEGER DEFAULT 0,
    "courseCodeId" INTEGER NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicUpload" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "size" TEXT,
    "name" TEXT,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "TopicUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedMaterials" (
    "id" SERIAL NOT NULL,
    "SavedUserId" INTEGER NOT NULL,
    "SavedTopicId" INTEGER NOT NULL,

    CONSTRAINT "SavedMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materialLike" (
    "id" SERIAL NOT NULL,
    "likedUserId" INTEGER NOT NULL,
    "likedMaterialId" INTEGER NOT NULL,

    CONSTRAINT "materialLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upload" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "size" TEXT,
    "name" TEXT,
    "materialId" INTEGER,

    CONSTRAINT "upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "CourseCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "materialsId" INTEGER,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "materialsId" INTEGER,
    "facultyId" INTEGER,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "forAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TopicToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Material_slug_key" ON "Material"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCode_name_key" ON "CourseCode"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCode_slug_key" ON "CourseCode"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_name_key" ON "Faculty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_slug_key" ON "Faculty"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_slug_key" ON "Department"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_TopicToUser_AB_unique" ON "_TopicToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TopicToUser_B_index" ON "_TopicToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedTopics" ADD CONSTRAINT "SavedTopics_SavedUserId_fkey" FOREIGN KEY ("SavedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedTopics" ADD CONSTRAINT "SavedTopics_SavedTopicId_fkey" FOREIGN KEY ("SavedTopicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topiclike" ADD CONSTRAINT "Topiclike_likeUserId_fkey" FOREIGN KEY ("likeUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topiclike" ADD CONSTRAINT "Topiclike_likedTopicId_fkey" FOREIGN KEY ("likedTopicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_materialsId_fkey" FOREIGN KEY ("materialsId") REFERENCES "Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_likedUserId_fkey" FOREIGN KEY ("likedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyLike" ADD CONSTRAINT "ReplyLike_likeUserId_fkey" FOREIGN KEY ("likeUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyLike" ADD CONSTRAINT "ReplyLike_replysId_fkey" FOREIGN KEY ("replysId") REFERENCES "Reply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_courseCodeId_fkey" FOREIGN KEY ("courseCodeId") REFERENCES "CourseCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicUpload" ADD CONSTRAINT "TopicUpload_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedMaterials" ADD CONSTRAINT "SavedMaterials_SavedUserId_fkey" FOREIGN KEY ("SavedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedMaterials" ADD CONSTRAINT "SavedMaterials_SavedTopicId_fkey" FOREIGN KEY ("SavedTopicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materialLike" ADD CONSTRAINT "materialLike_likedUserId_fkey" FOREIGN KEY ("likedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materialLike" ADD CONSTRAINT "materialLike_likedMaterialId_fkey" FOREIGN KEY ("likedMaterialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_materialsId_fkey" FOREIGN KEY ("materialsId") REFERENCES "Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_materialsId_fkey" FOREIGN KEY ("materialsId") REFERENCES "Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopicToUser" ADD CONSTRAINT "_TopicToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopicToUser" ADD CONSTRAINT "_TopicToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
