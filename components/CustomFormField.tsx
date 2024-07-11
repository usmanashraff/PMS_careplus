import { Input } from "@/components/ui/input"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PaitentForm"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectValue, SelectTrigger } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"


interface customProps{
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    imgSrc?: string,
    altIcon?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any)=> React.ReactNode

}

const RenderField = ({field, props}: {field: any, props: customProps}) =>{
    const {fieldType, imgSrc, placeholder, altIcon, showTimeSelect, dateFormat, renderSkeleton} = props;
    switch (props.fieldType){
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex gap-4 items-center">
                        <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
                        <label htmlFor={props.name} className="checkbox-label">{props.label}</label>
                    </div>
                </FormControl>
            )
        case FormFieldType.INPUT: 
        return (
            <div className="flex rounded-md border items-center border-dark-500 bg-dark-400">
                {imgSrc && (
                    
                        <Image src={imgSrc}
                            height={24}
                            width={24}
                            alt={altIcon || 'icon'}
                            className="mx-2" />
                
                )}

                <FormControl >
                    <input placeholder={placeholder} {...field} className="shad-input border-0 px-2 w-full outline-none" />
                </FormControl>
            </div>
        )
        break;
        case FormFieldType.TEXTAREA:
            return (
               <FormControl>
            <Textarea
               placeholder={placeholder}
               {...field}
               disabled={props.disabled}
               className="shad-textArea"
                ></Textarea>
               </FormControl>
            ) 
        case FormFieldType.PHONE_INPUT: 
        return(
            <FormControl>
                <PhoneInput
                        placeholder={placeholder}
                        withCountryCallingCode
                        international
                        defaultCountry='US'
                        value={field.value as undefined}
                        onChange={field.onChange}
                        className='input-phone'
                        />
            </FormControl>
        )
        break;
        case FormFieldType.DATE_PICKER: return(
            
            <div className="flex rounded-md border items-center border-dark-500 bg-dark-400">
               <label htmlFor="date-picker">
               <Image src='/assets/icons/calendar.svg'
                alt="calender"
                width={24}
                height={24}
                className="ml-2"
                />
               </label>
                <FormControl id='date-picker'>
                <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} 
                    showTimeSelect={showTimeSelect ?? false}
                    dateFormat={dateFormat ?? 'MM/DD/YYYY'}
                    wrapperClassName="date-picker"
                    timeInputLabel="Time"
                    />

                </FormControl>
            </div>
        )
        break;
        case FormFieldType.SKELETON:
             return renderSkeleton ? renderSkeleton(field) : null;
        
        break;
        default:
        case FormFieldType.SELECT: 
        return (
            <FormControl>
                <Select onValueChange={field.onChange}
                 defaultValue={field.value}
                >
                    <FormControl >
                        <SelectTrigger className="shad-select-trigger">
                        <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="shad-select-content">
                        {props.children}
                    </SelectContent>
                </Select>
            </FormControl>
        )
        break;
        
    }
}
const CustomFormField = (props: customProps) => {
    const {control, fieldType, name, label, imgSrc, altIcon, placeholder} = props;

  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-1">
        {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
        )}

        <RenderField field={field} props={props} />
        <FormMessage className="shad-error" />
      </FormItem>
    )}
  />
  )
}

export default CustomFormField