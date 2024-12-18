import moment from "moment/moment";
import DataTable from "react-data-table-component";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import printReport from "./PrintReportCheck";
import CustomLoader from "../../util/LoadingTable";
import {
  cancelInventoryCheck,
  listInventoryCheck,
  statusInventoryCheck,
} from "../../Redux/Actions/InventoryCheckAction";
import {
  INVENTORY_CHECK_CANCEL_RESET,
  INVENTORY_CHECK_STATUS_RESET,
} from "../../Redux/Constants/InventoryCheckConstant";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import NoRecords from "../../util/noData";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const InventoryCheck = (props) => {
  const { inventoryCheck, loading, loadingStatus } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [reportShow, setReportShow] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [modalCancel, setModalCancel] = useState(false);
  const [dataModalCancel, setDataModalCancel] = useState();
  const inventoryCheckStatus = useSelector(
    (state) => state.inventoryCheckStatus,
  );
  const { success } = inventoryCheckStatus;

  const inventoryCheckCancel = useSelector(
    (state) => state.inventoryCheckCancel,
  );
  const { success: successCancel } = inventoryCheckCancel;

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal-warning"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "black" }}
          >
            Cập nhật trạng thái
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn duyệt phiếu kiểm{" "}
            <span className="text-warning">{dataModal?.checkCode}</span> ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            style={{ fontWeight: "600" }}
            onClick={() => {
              dispatch(statusInventoryCheck(dataModal?._id));
              setModalShow(false);
            }}
          >
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const MyVerticallyCenteredModalCancel = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Hủy phiếu kiểm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn hủy phiếu kiểm{" "}
            <span className="text-danger">{dataModalCancel?.checkCode}</span> ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-danger"
            onClick={() => {
              dispatch(cancelInventoryCheck(dataModalCancel?._id));
              setModalCancel(false);
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const CustomMaterialMenu = (props) => {
    let { row } = props;
    return (
      <div className="dropdown">
        <Link to="#" data-bs-toggle="dropdown" className="btn btn-light">
          <i className="fas fa-ellipsis-h"></i>
        </Link>
        <div className="dropdown-menu">
          {row.status === false ? (
            <>
              <button
                className="dropdown-item active-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalShow(true);
                  setDataModal(row);
                }}
              >
                <i className="fas fa-clipboard-check"></i>
                <span> Xác nhận </span>
              </button>

              <button
                className="dropdown-item active-menu"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/inventory-check/${row._id}`);
                }}
              >
                <i className="fas fa-pencil"></i>
                <span> Chỉnh sửa</span>
              </button>
            </>
          ) : (
            <button
              className="dropdown-item active-menu"
              onClick={(e) => {
                e.preventDefault();
                history.push(`/inventory-check/${row._id}`);
              }}
            >
              <i className="fas fa-eye"></i>
              <span> Xem chi tiết</span>
            </button>
          )}
          <button
            className="dropdown-item active-menu"
            onClick={(e) => {
              e.preventDefault();
              setReportShow(true);
              setDataModal(row);
            }}
          >
            <i className="fas fa-print"></i>
            <span> In phiếu</span>
          </button>
          {row.status === false ? (
            <button
              className="dropdown-item active-menu text-danger"
              onClick={(e) => {
                e.preventDefault();
                setModalCancel(true);
                setDataModalCancel(row);
              }}
            >
              <i className="fas fa-trash"></i>
              <span> Hủy phiếu kiểm</span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  const columns = [
    {
      name: "STT",
      selector: (row, index) => <b>{index + 1}</b>,
      reorder: true,
      width: "60px",
    },
    {
      name: "Mã phiếu kiểm",
      selector: (row) => row?.checkCode,
      sortable: true,
      reorder: true,
      grow: 3,
    },
    {
      name: "Tên người kiểm",
      selector: (row) => row?.user?.name,
      sortable: true,
      reorder: true,
      grow: 2,
    },
    {
      name: "Ngày kiểm",
      selector: (row) => moment(row?.checkedAt).format("DD/MM/YYYY"),
      sortable: true,
      reorder: true,
      grow: 2,
    },
    {
      name: "Ghi chú",
      selector: (row) => row?.note,
      sortable: true,
      reorder: true,
      grow: 2,
    },
    {
      name: "Trạng thái",
      selector: (rows) =>
        rows?.status === true ? (
          <span className="badge bg-success text-white">Đã hoàn tất</span>
        ) : (
          <span className="badge bg-danger text-white">Chưa duyệt</span>
        ),
      sortable: true,
      reorder: true,
      sortFunction: (importStock) => {
        return [importStock].map((a, b) => {
          const fieldA = a?.status;
          const fieldB = b?.status;
          let comparison = 0;

          if (fieldA === fieldB) {
            comparison = 0;
          } else if (fieldA === true) {
            comparison = 1;
          } else {
            comparison = -1;
          }

          return comparison;
        });
      },
      grow: 1,
    },
    {
      name: "Hành động",
      cell: (row) => <CustomMaterialMenu row={row} />,
      allowOverflow: true,
      button: true,
      width: "100px",
    },
  ];

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

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
        fontSize: "16px",
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
        fontSize: "16px",
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "grey",
        },
      },
    },
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: INVENTORY_CHECK_STATUS_RESET });
      dispatch(listInventoryCheck());
    }
    if (successCancel) {
      dispatch({ type: INVENTORY_CHECK_CANCEL_RESET });
      dispatch(listInventoryCheck());
      toast.success("Hủy phiếu kiểm thành công", ToastObjects);
    }
    if (reportShow) {
      printReport(dataModal);
      setReportShow(false);
      setDataModal(null);
    }
    // eslint-disable-next-line
  }, [dispatch, success, reportShow, successCancel]);

  return (
    <>
      <Toast />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModalCancel
        show={modalCancel}
        onHide={() => setModalCancel(false)}
      />
      <div className="CHtfP">
        <DataTable
          // theme="solarized"
          columns={columns}
          data={inventoryCheck}
          noDataComponent={NoRecords()}
          customStyles={customStyles}
          defaultSortFieldId
          pagination
          // onRowClicked={handleRowClicked}
          paginationComponentOptions={paginationComponentOptions}
          progressPending={loading || loadingStatus}
          progressComponent={<CustomLoader />}
          highlightOnHover
          pointerOnHover
        />
      </div>
    </>
  );
};
export default InventoryCheck;
