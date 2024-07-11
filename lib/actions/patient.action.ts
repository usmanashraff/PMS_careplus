'use server'
import { ID, Query } from "node-appwrite"
import { databases, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"
import {InputFile} from  'node-appwrite/file'
export const createUser = async(user: CreateUserParams ): Promise<any> =>{
    try {
        const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name)
        console.log('from action file',newUser)
        return newUser
    } catch (error:any) {
        if(error && error?.code == 409){ // error code 409 means user exists
            const document = await users.list([
                Query.equal('email', [user.email])
            ])
            return { message: 'user_already_exists', content: document}
            
        }
        return {message: 'error in creating user', content: error}
        
        
    }

}


// GET USER
export const getUser = async (userId: string): Promise<any> => {
    try {
      const user = await users.get(userId);
  
      return parseStringify(user);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the user details:",
        error
      );
      return {message: 'error in geting user', content:error}
    }
  };


  export const getPatient = async (userId: string): Promise<any> => {
    try {
      const patient = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
        [Query.equal('userId', userId)]
      );
  
      return parseStringify(patient.documents[0]);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the patient details:",
        error
      );
      return {message: 'error in geting patient', content:error}
    }
  };




// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  console.log("subbmittes")
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${process.env.NEXT_PUBLIC_PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};