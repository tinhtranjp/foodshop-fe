// import { TextField } from '@mui/material'
// import React from 'react'
// import { Controller, UseFormReturn } from 'react-hook-form'

// interface InputFile {
//   form: {}
//   name: string
//   label: string
//   disabled: boolean
// }

// export const InputFile: React.FC<InputFile> = (props) => {
//   const { form, name, label, disabled } = props

//   const { errors } = form
//   const hasError = errors[name]
//   return (
//     <div>
//       <Controller
//         name={name}
//         control={form.control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             variant='outlined'
//             fullWidth
//             label={label}
//             disabled={disabled}
//             error={!!hasError}
//             helperText={errors[name]?.message}
//             name={name}
//           ></TextField>
//         )}
//       ></Controller>
//     </div>
//   )
// }
