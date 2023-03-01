import DataTable from "react-data-table-component";
import React, {useEffect} from "react";
import CustomLoader from '../../util/LoadingTable';
import ExpandedComponent from './ExpandedComponent'
const InventoryTable = (props) =>{
    const {inventory, dessert, expanded, loading} = props 
    const columns = [
        {
            name: "STT",
            selector: (row, index) => <bold>{index+1}</bold>,
            reorder: true,
            width: '60px'

        },
        {
            name: "NAME",
            selector: (row) => row.name,
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "CATEGORY",
            selector: (row) => row.category.join(', '),
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "CATEGORY DRUG",
            selector: (row) => row.categoryDrug.join(', '),
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "TOTAL COUNT",
            selector: (row) => row.total_count,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "UNIT",
            selector: (row) => row.unit,
            sortable: true,
            reorder: true,
            grow: 2
        }     
    ];

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
    };

    const customStyles = {
        rows: {
            highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            // borderRadius: '25px',
            outline: '1px solid #FFFFFF',
            },
        },
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                fontSize: '14px',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor:'grey',
            },
        },
        headCells: {
            style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: 'grey',
            },
            },
        },
        cells: {
            style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: 'grey',
            },
            },
        },
    };
    const isExpanded = row => row.defaultExpanded;

    useEffect(()=>{
        inventory?.map(item=>item.defaultExpanded = expanded)// eslint-disable-next-line
    },[expanded])


  return (
    <>

        <DataTable
            // theme="solarized"
            columns={columns}
            data={inventory}
            customStyles={customStyles}
            defaultSortFieldId
            pagination
            // onRowClicked={handleRowClicked}
            paginationComponentOptions={paginationComponentOptions}
            progressPending={loading}
            expandableRows
			expandableRowExpanded={isExpanded}
            expandableRowsComponent={(data) => <ExpandedComponent data={data} dessert={dessert} />}
		    progressComponent={<CustomLoader />}
            highlightOnHover
            pointerOnHover
        />
    </>

  )  
}
export default InventoryTable;