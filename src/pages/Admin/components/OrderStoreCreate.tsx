import {zodResolver} from '@hookform/resolvers/zod'
import {Box, Button, TextField} from '@mui/material'
import {Controller, useForm} from 'react-hook-form'
import {z} from 'zod'
import {InputText} from '~/components/InputFile/InputText'
import {useState} from 'react'
import {orderDetail} from '~/utils/orderSchema1'
import {toastSuccess} from '~/components/CustomToast'
import {ToastContainer} from 'react-toastify'
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import {styled} from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import dayjs, {Dayjs} from 'dayjs'
import {DemoContainer} from '@mui/x-date-pickers/internals/demo'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import OrderStoreForm from './OrderStoreForm'

type InputState = z.infer<typeof orderDetail>

interface OrderDetails {
  id: string
  name: string
  price: string
  quantity: string
  note: string
}

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '500px',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))
export const OrderStoreCreate = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [detail, setDetail] = useState<OrderDetails | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const handleClickOpenDiaLog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Ban co muon xoa bo cot nay khong?')) {
      const updatedOrderDetails = orderDetails.filter((item) => item.id !== id)
      setOrderDetails(updatedOrderDetails)
      toastSuccess('Ban da xoa thanh cong')
    }
  }

  const handleDetail = (id: string) => {
    const orderDetailsId = orderDetails.filter((item) => item.id === id)
    setDetail(orderDetailsId[0])
    handleClickOpenDiaLog()
  }

  const handleCellClick = (params: GridCellParams) => {
    const clickedId = params.row.id
    const isSelected = selectedIds.includes(clickedId)
    let updatedIds: string[]

    if (isSelected) {
      updatedIds = selectedIds.filter((id) => id !== clickedId)
    } else {
      updatedIds = [...selectedIds, clickedId]
    }

    setSelectedIds(updatedIds)
  }

  const handleSelectionChange = (selection: GridRowId[]) => {
    const selectedIds: string[] = selection.map((rowId) => rowId.toString())
    setSelectedIds(selectedIds)
  }

  const handleAction = () => {
    if (selectedIds.length <= 0) {
      return
    }
    if (window.confirm('Ban co muon xoa bo cot nay khong?')) {
      const updatedOrderDetails = orderDetails.filter(
        (item) => !selectedIds.includes(item.id),
      )
      setOrderDetails(updatedOrderDetails)
      toastSuccess('Ban da xoa thanh cong')
    }
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = {...newRow}
    const price = Number(newRow.price)
    const quantity = Number(newRow.quantity)
    updatedRow.total = price * quantity

    const updatedOrderDetails = orderDetails.map((row) => {
      if (row.id === newRow.id) {
        return updatedRow as OrderDetails
      }
      return row
    })
    setOrderDetails(updatedOrderDetails)

    return updatedRow
  }

  const handleOrderDetailsChange = (newOrderDetails: OrderDetails[]) => {
    setOrderDetails(newOrderDetails)
  }
  const {
    control,
    handleSubmit: handleSubmit1,
    clearErrors,
    formState: {errors},
    reset,
  } = useForm<InputState>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      price: '',
      quantity: '',
      note: '',
    },
    resolver: zodResolver(orderDetail),
  })

  const onSubmit = (data: InputState) => {
    const newData = {
      ...data,
      total: Number(data.price) * Number(data.quantity),
      id: (orderDetails.length + 1).toString(),
    }
    setOrderDetails([...orderDetails, newData])

    toastSuccess('Ban da them thanh cong!')
    reset()
  }

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70, type: 'number'},
    {field: 'name', headerName: 'Name', width: 200, editable: true},
    {
      field: 'price',
      headerName: 'Price',
      width: 130,
      editable: true,
      type: 'number',
      valueGetter: (params: GridValueGetterParams) => {
        const value = Number(params.row.price).toLocaleString()
        return value
      },
    },
    {
      field: 'quantity',
      headerName: 'quantity',
      width: 100,
      editable: true,
      type: 'number',
    },
    {
      field: 'note',
      headerName: 'Note',
      width: 200,
      editable: true,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 130,

      valueGetter: (params: GridValueGetterParams) => {
        const price = Number(params.row.price)
        const quantity = Number(params.row.quantity)
        return price * quantity
      },
      type: 'number',
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <Button
          variant='contained'
          color='error'
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
    {
      field: 'detail',
      headerName: 'Detail',
      width: 100,
      renderCell: (params) => (
        <Button
          variant='contained'
          color='secondary'
          onClick={() => handleDetail(params.row.id)}
        >
          Detail
        </Button>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{display: 'flex', justifyContent: 'end', mb: '-10px'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label='Date'
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          variant='contained'
          color='error'
          sx={{m: 3, mr: 0}}
          onClick={handleAction}
        >
          Remove Id
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Box component='form' onSubmit={handleSubmit1(onSubmit)}>
            <InputText
              name='name'
              control={control}
              error={errors.name?.message ?? undefined}
              label={'Ten san pham'}
              size='small'
              onFocus={() => {
                clearErrors('name')
              }}
            />
            <InputText
              name='price'
              control={control}
              error={errors.price?.message ?? undefined}
              label={'Gia tien'}
              size='small'
              onFocus={() => {
                clearErrors('price')
              }}
            />
            <InputText
              name='quantity'
              control={control}
              error={errors.quantity?.message ?? undefined}
              label={'So luong'}
              size='small'
              onFocus={() => {
                clearErrors('quantity')
              }}
            />
            <Controller
              name='note'
              control={control}
              render={({field}) => (
                <TextField
                  sx={{
                    width: '100%',
                    mt: '10px',
                    mb: '25px',
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                  id='outlined-multiline-static'
                  name='note'
                  label='Ghi chu'
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  multiline
                  rows={4}
                />
              )}
            />
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </Box>
        </Box>
        <Box sx={{pt: '10px', width: '100%', ml: '40px'}}>
          <DataGrid
            rows={orderDetails}
            columns={columns}
            onCellClick={handleCellClick}
            onRowSelectionModelChange={handleSelectionChange}
            processRowUpdate={processRowUpdate}
            initialState={{
              pagination: {
                paginationModel: {page: 0, pageSize: 5},
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
          {orderDetails && (
            <Typography fontWeight={600} textAlign='right' py={2}>
              Tổng tiền :{' '}
              {orderDetails
                .reduce((total, item) => {
                  const price = parseFloat(item.price)
                  const quantity = parseFloat(item.quantity)
                  const subtotal = price * quantity
                  return total + subtotal
                }, 0)
                .toLocaleString()}
              円
            </Typography>
          )}
          <OrderStoreForm
            orderDetails={orderDetails}
            date={value}
            onOrderDetailsChange={handleOrderDetailsChange}
          />
        </Box>
      </Box>
      <BootstrapDialog
        onClose={handleCloseDialog}
        aria-labelledby='customized-dialog-title'
        open={openDialog}
        PaperProps={{
          style: {
            margin: 'auto',
            marginTop: '10%',
          },
        }}
      >
        <DialogTitle sx={{m: 0, p: 2, px: 5}} id='customized-dialog-title'>
          Detail
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{px: 3}}>
            <Typography gutterBottom py={1}>
              ID: {detail?.id}
            </Typography>
            <Typography gutterBottom py={1}>
              Name: {detail?.name}
            </Typography>
            <Typography gutterBottom py={1}>
              Gia tien: {Number(detail?.price).toLocaleString()}円
            </Typography>
            <Typography gutterBottom py={1}>
              So luong: {detail?.quantity}
            </Typography>
            <Typography gutterBottom py={1}>
              Tong tien:{' '}
              {(
                Number(detail?.price) * Number(detail?.quantity)
              ).toLocaleString()}
              円
            </Typography>
            {detail?.note && (
              <Typography gutterBottom py={1}>
                Ghi chu: {detail?.note}
              </Typography>
            )}
          </Box>
        </DialogContent>
      </BootstrapDialog>
      <ToastContainer />
    </Box>
  )
}
