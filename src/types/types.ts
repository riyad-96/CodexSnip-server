import { ObjectId } from 'mongodb';

export type CodeBlock = {
  _id?: ObjectId | undefined;
  uid: string;
  email: string;
  folder_id: ObjectId;
  title: string;
  description: string;
  code: string;
  language: string;
  theme: string;
  created_at: number | string | Date;
  updated_at: number | string | Date;
};

export type CodeFolder = {
  _id?: ObjectId | undefined;
  uid: string;
  email: string;
  folder_name: string;
  folder_description: string;
  code_blocks: ObjectId[];
  created_at: number | string | Date;
  updated_at: number | string | Date;
};

export type EditorUpdateValuesType = {
  title: string;
  description: string;
  code: string;
  language: string;
  theme: string;
  code_block_id: string;
  folder_id: string;
  updated_at?: number | string | Date;
};

export type UpdateFolderDetailsType = {
  folder_id: string;
  folder_name: string;
  folder_description: string;
  updated_at: number | Date | string;
};

export type NewFolderDataType = {
  folder_name: string;
  folder_description: string;
};
