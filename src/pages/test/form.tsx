// import { zodResolver } from '@hookform/resolvers/zod'
// import { Box, Button } from '@mui/material'
// import { useForm } from 'react-hook-form'
// import { formSchema } from '~/utils/formSchema'
// import RHFTextField from './RHFTextField'

// interface FormValues {
//     fullName: string;
//     age: number;
//   }


// const Form = () => {
//     const {
//         control,
//         handleSubmit,
//         clearErrors,
//         formState: { errors },
//       } = useForm<FormValues>({
//         mode: 'onBlur',
//         reValidateMode: 'onBlur',
//         resolver: zodResolver(formSchema),
//         defaultValues: undefined
//       })
//       const handleFocus = (name: keyof FormValues) => {
//         clearErrors(name)
//       }
//     const onSubmit = (data : FormValues) => {
//         console.log(data);
        
//     }
//   return (
//     <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//         <RHFTextField name="fullName" control={control} label="必須入力" onFocus={() => handleFocus("fullName")}/>
//         <RHFTextField name="age" control={control} label="必須入力"  onFocus={() => handleFocus("age")}/>
//         <Button  variant='outlined' type='submit'>Submit</Button>
//     </Box>
//   )
// }

// export default Form