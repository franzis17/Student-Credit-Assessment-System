/**
 * Toolbar for MUI datagrid of each list of institutions + units + applications
 */

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

export default function CustomToolbar() {
  return (
    <GridToolbarContainer>
      {/* <GridToolbarColumnsButton style={{ color: '#3f51b5' }} /> */}
      <GridToolbarFilterButton style={{ color: '#3f51b5' }} />
      <GridToolbarDensitySelector style={{ color: '#3f51b5' }} />
      <GridToolbarExport style={{ color: '#3f51b5' }} />
    </GridToolbarContainer>
  )
}
