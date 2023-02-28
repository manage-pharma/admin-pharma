import DataTable from "react-data-table-component";
import React from "react";
import CustomLoader from '../../util/LoadingTable';
import ExpandedComponent from './ExpandedComponent'
const InventoryTable = (props) =>{
    const {inventory, loading, loadingStatus} = props 
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
        // {
        //     name: "PROVIDER",
        //     selector: (row) => row.provider.name,
        //     sortable: true,
        //     reorder: true,
        //     grow: 2
        // },
        // {
        //     name: "CREATED BY",
        //     selector: (row) => row.user.name,
        //     sortable: true,
        //     reorder: true,
        //     grow: 2
        // },
        // {
        //     name: "IMPORTED AT",
        //     selector: (row) => moment(row.importedAt).format("DD/MM/YYYY"),
        //     sortable: true,
        //     reorder: true,
        //     grow: 2
        // },
        // {
        //     name: "STATUS",
        //     selector: (rows) => rows.status === true ? 
        //         (<span className="badge bg-success text-white">Completed</span>) : 
        //         (<span className="badge bg-danger text-white">Incomplete</span>),
        //     sortable: true,
        //     reorder: true,
        //     sortFunction: (importStock) => {
        //         return [importStock].map((a, b) => {
        //           const fieldA = a.status;
        //           const fieldB = b.status;
        //           let comparison = 0;
              
        //           if (fieldA === fieldB) {
        //             comparison = 0;
        //           } else if (fieldA === true) {
        //             comparison = 1;
        //           } else {
        //             comparison = -1;
        //           }
              
        //           return comparison
        //         });
        //     },
        //     grow: 1
        // },
        // {   name: "ACTION",
        //     cell: row => <CustomMaterialMenu row={row} />,
        //     allowOverflow: true,
        //     button: true,
        //     width: '100px',
        // },
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
            progressPending={loading||loadingStatus}
            expandableRows
			expandableRowExpanded={isExpanded}
            expandableRowsComponent={(data) => <ExpandedComponent data={data} />}
		    progressComponent={<CustomLoader />}
            highlightOnHover
            pointerOnHover
        />
    </>

  )  
}
export default InventoryTable;