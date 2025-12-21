import { ObjectId } from "mongodb";
import { codeFoldersCollection } from "./mongodbConnection.js";

export default async function updateCodeFolderUpdateTime(email: string, folder_id: ObjectId) {
  const folderColl = codeFoldersCollection();

  await folderColl.updateOne(
    { email, _id: folder_id },
    {
      $set: {
        updated_at: new Date(),
      },
    },
  );
}