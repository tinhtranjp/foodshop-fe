import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {useParams} from 'react-router-dom'
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
} from '@mui/x-data-grid'
import {useEffect, useState} from 'react'
import orderApi from '~/api/orderStoreAPI'
import {useNavigate} from 'react-router-dom'

const initialRows: GridRowsProp = []

export default function OrderStoreDetail() {
  const [rows, setRows] = useState(initialRows)
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const [order, setOrder] = useState(null)
  console.log(order)

  let {orderId} = useParams()

  const navigate = useNavigate()
  useEffect(() => {
    orderApi
      .get(orderId)
      .then((response: any) => {
        setOrder(response)
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
      field: 'orderDate',
      headerName: 'Date',
      type: 'string',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'note',
      headerName: 'Note',
      type: 'string',
      width: 200,
      editable: true,
    },
    {
      field: 'totalMoney',
      headerName: 'Total',
      width: 120,
      editable: false,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'detail',
      headerName: 'Detail',
      width: 100,
      renderCell: (params) => (
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            navigate(`/admin/order-store/view/${params.row.id}`)
          }}
        >
          Detail
        </Button>
      ),
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
        height: '80vh',
        mx: 'auto',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
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
    </Box>
  )
}
