
'use server'
import { ID, Query } from "node-appwrite";
import { databases, messaging } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async(appointment: CreateAppointmentParams)=>{
    try {
        console.log(appointment)
        const newAppointment = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            
              appointment
            
          );
      
          return parseStringify(newAppointment);
    } catch (error) {
        console.log(error)
    }
}

export const getAppointment = async(appointmentId: string)=>{
     try {
        const appointment = await databases.getDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
            appointmentId
        )
        return parseStringify(appointment)
     } catch (error) {
        console.log(error)
     }
}


export const getRecentAppointments = async()=>{
    try {
        const appointments = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const initialCount = {
            pendingCount : 0,
            scheduledCount : 0,
            cancelledCount : 0
        }

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment)=>{
            if(appointment.status === 'pending')
                acc.pendingCount += 1;
            else if(appointment.status === 'cancelled')
                acc.cancelledCount += 1;
            else
            acc.scheduledCount += 1;
        return acc;

        }, initialCount)


        const count = {
            totalAppointments: appointments.total,
            ...counts,
            documents: appointments.documents


        }

        revalidatePath('/admin')
        return parseStringify(count)
    } catch (error) {
        console.log(error)
    }
}

export const updateAppointment = async({appointmentId, userId, appointment,type}: UpdateAppointmentParams)=>{

    try {
        const updatedAppointment = await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        )

        if(!updatedAppointment){
            throw new Error('there was an error updating appointment')

        }
        // TODO appointment sms
        const smsContent = `
        Hi, its CarePlus.
        ${type === 'schedule' ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule).dateTime} with Dr.${appointment.primaryPhysician}`
            : `we regret to inform you that your appointment has been cancelled for the following reason: 
            Reason: ${appointment.cancellationReason}
            `
        }
        `
        await sendSMSnotification(userId, smsContent)

        revalidatePath('/admin')
         
        return parseStringify(updatedAppointment)
    } catch (error) {
        console.log(error)
    }
}


export const sendSMSnotification = async (userId: string, content: string)=>{
    try {
        const message = await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId]
        )
        return parseStringify(message) 
    } catch (error) 
    {
        console.log(error)
    }
} 