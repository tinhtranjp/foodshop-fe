import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box } from '@mui/material'

interface ItemProps {
  currentSort: string | (string | null)[]
  onChange: (newValue: string) => void
}

function ProductSort(props: ItemProps) {
  const { currentSort, onChange } = props

  const handleChangeSort = (
    event: React.ChangeEvent<unknown>,
    newValue: string,
  ) => {
    if (onChange) onChange(newValue)
  }

  return (
    <Box sx={{ pt: 2 }}>
      <Tabs
        value={currentSort}
        onChange={handleChangeSort}
        textColor='secondary'
        indicatorColor='secondary'
        aria-label='secondary tabs example'
      >
        <Tab label='Gia thap toi cao' value='asc'></Tab>
        <Tab label='Gia cao xuong thap' value='desc'></Tab>
      </Tabs>
    </Box>
  )
}

export default ProductSort
