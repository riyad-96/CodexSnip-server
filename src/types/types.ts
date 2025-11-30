import { ObjectId } from "mongodb";

export type CodeBlock = {
  _id?: string;
  uid: string;
  email: string;
  title: string;
  description: string;
  code: string;
  language: string;
  createdAt: number;
  updatedAt: number;
};

export type CodeFolder = {
  _id?: ObjectId | undefined;
  uid: string;
  email: string;
  folder_name: string;
  folder_description: string;
  code_blocks: [];
  created_at: number | Date;
  updated_at: number | Date;
};

export type ClientCodeFolderPostType = Omit<CodeFolder, '_id'| 'created_at' | 'updated_at'>;