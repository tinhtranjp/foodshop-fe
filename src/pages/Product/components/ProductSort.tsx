import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {Box} from '@mui/material'

interface ItemProps {
  currentSort: string | (string | null)[]
  onChange: (newValue: string) => void
}

function ProductSort(props: ItemProps) {
  const {currentSort, onChange} = props

  const handleChangeSort = (
    event: React.ChangeEvent<unknown>,
    newValue: string,
  ) => {
    console.log(event)

    if (onChange) onChange(newValue)
  }

  return (
    <Box sx={{pt: 2, display: {xs: 'none', sm: 'block'}}}>
      <Tabs
        value={currentSort}
        onChange={handleChangeSort}
        textColor='secondary'
        indicatorColor='secondary'
        aria-label='secondary tabs example'
      >
        <Tab
          label='高格順'
          sx={{
            fontSize: {md: '22px'},
            letterSpacing: {md: '2px'},
          }}
          value='asc'
        ></Tab>
        <Tab
          label='安格順'
          sx={{
            fontSize: {md: '22px'},
            letterSpacing: {md: '2px'},
          }}
          value='desc'
        ></Tab>
      </Tabs>
    </Box>
  )
}

export default ProductSort
