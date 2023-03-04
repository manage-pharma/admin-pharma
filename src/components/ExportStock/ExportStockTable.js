import DataTable from "react-data-table-component";
import React, { useEffect } from "react";
import CustomLoader from "../../util/LoadingTable";
import ExpandedExportComponent from "./ExpandedExportComponent";
const ExportTable = (props) => {
  const { itemProducts, dessert, expanded, handleDeleteItem } = props;
  const columns = [
    {
      name: "STT",
      selector: (row, index) => <bold>{index + 1}</bold>,
      reorder: true,
      width: "60px",
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row?.product?.name || row?.name,
      sortable: true,
      reorder: true,
      grow: 3,
    },

    {
      name: "Tổng số lượng",
      selector: (row) =>
        row.lotField.reduce((accumulator, currentValue) => {
          return accumulator + parseInt(currentValue.count);
        }, 0),
      sortable: true,
      reorder: true,
      grow: 2,
    },
    {
      name: "Hành động",
      selector: (row, index) => (
        <div>
          <button
            style={{fontSize: '18px'}}
            className="dropdown-item text-danger"
            onClick={(e) => handleDeleteItem(e, index, row.product._id || row.product)}
          >
            <i class="fa fa-trash"></i>
          </button>
        </div>
      ),
      sortable: true,
      reorder: true,
      grow: 2,
    },
  ];
  const customStyles = {
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "rgb(230, 244, 244)",
        borderBottomColor: "#FFFFFF",
        // borderRadius: '25px',
        outline: "1px solid #FFFFFF",
      },
    },
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        fontSize: "14px",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "grey",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "grey",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "grey",
        },
      },
    },
  };
  const isExpanded = (row) => row.defaultExpanded;

  useEffect(() => {
    itemProducts?.map((item) => (item.defaultExpanded = expanded)); // eslint-disable-next-line
  }, [expanded]);

  return (
    <>
      <DataTable
        // theme="solarized"
        columns={columns}
        data={itemProducts}
        customStyles={customStyles}
        defaultSortFieldId
        // onRowClicked={handleRowClicked}
        expandableRows
        expandableRowExpanded={isExpanded}
        expandableRowsComponent={(data) => (
          <ExpandedExportComponent data={data} dessert={dessert} />
        )}
        progressComponent={<CustomLoader />}
        highlightOnHover
        pointerOnHover
      />
    </>
  );
};
export default ExportTable;
