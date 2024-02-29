import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {useNavigate, useParams} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import {useEffect, useState} from 'react'
import orderApi from '~/api/orderStoreAPI'
import {Button, Typography} from '@mui/material'

const initialRows: GridRowsProp = []

export default function OrderStoreDetail() {
  const [rows, setRows] = useState(initialRows)
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  console.log(rows)

  // eslint-disable-next-line prefer-const
  let {orderId} = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    orderApi
      .get(orderId)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setRows(response.orderDetails1)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}})
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}})
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: {mode: GridRowModes.View, ignoreModifications: true},
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = {...newRow, isNew: false}
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 80, editable: false},
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      editable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 120,
      editable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'note',
      headerName: 'Note',
      type: 'string',
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
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({id}) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ]
      },
    },
  ]

  return (
    <Box
      sx={{
        height: '60vh',
        mx: 'auto',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <Box sx={{display: 'flex', justifyContent: 'end', mb: 5}}>
        <Button
          variant='contained'
          startIcon={<ArrowBackIcon />}
          color='secondary'
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: {setRows, setRowModesModel},
        }}
      />
      <Typography fontWeight={600} textAlign='right' py={2}>
        Tổng tiền :{' '}
        {rows
          .reduce((total, item) => {
            const price = parseFloat(item.price)
            const quantity = parseFloat(item.quantity)
            const subtotal = price * quantity
            return total + subtotal
          }, 0)
          .toLocaleString()}
        円
      </Typography>
    </Box>
  )
}
