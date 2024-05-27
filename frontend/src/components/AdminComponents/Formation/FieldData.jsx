import React, { useState } from 'react';
import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FootballFormation from "./FieldCreator";
import { toast } from "react-toastify";
import { useSetSelectionMutation, useDeleteTeamMutation } from "../../../slices/adminApiSlice";
import Loader from "../../Loader";

const compo = [{
  "4-4-2": {
    keeper: 1,
    defender: 4,
    middle: 4,
    attacker: 2
  },
  "4-3-3": {
    keeper: 1,
    defender: 4,
    middle: 3,
    attacker: 3
  },
  "4-2-3-1": {
    keeper: 1,
    defender: 4,
    middle: 5,
    attacker: 1
  },
  "3-5-2": {
    keeper: 1,
    defender: 3,
    middle: 5,
    attacker: 2
  },
  "5-3-2": {
    keeper: 1,
    defender: 5,
    middle: 3,
    attacker: 2
  },
}];

const DisplayFormation = ({ users }) => {
  const data = users;

  const [teamBuild, setTeamBuild] = useState([]);
  const [selectionTeam, { isLoading }] = useSetSelectionMutation();
  const [deleteTeam, { isLoading: isDeleteLoading }] = useDeleteTeamMutation();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleDelete = async () => {
    if (!userIdToDelete) return;

    try {
      await deleteTeam({ userId: userIdToDelete });
      toast.success("Team deleted successfully");
    } catch (err) {
      toast.error(err?.data?.errors[0]?.message || err?.error);
    }
    setUserIdToDelete(null);
    setShowDeleteDialog(false);
    window.location.reload();
  };

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteDialog(true);
  };

  const handleEdit = (userData) => {
    const tableEquipe = JSON.parse(userData.team);
    const { defender, attacker, middle, keeper } = tableEquipe.reduce((acc, obj) => {
      if (obj.position === 'defender') {
        acc.defender.push(obj.name);
      } else if (obj.position === 'attacker') {
        acc.attacker.push(obj.name);
      } else if (obj.position === 'middle') {
        acc.middle.push(obj.name);
      } else if (obj.position === 'keeper') {
        acc.keeper.push(obj.name);
      }
      return acc;
    }, { defender: [], attacker: [], middle: [], keeper: [] });

    const newTeam = {
      keeper,
      defender,
      middle,
      attacker,
    };

    // Met à jour teamBuild avec le nouvel objet
    setTeamBuild([newTeam]);

    // console.log('Formation:', formation);
    // console.log('Defenders:', defender);
    // console.log('Attackers:', attacker);
    // console.log('Midfielders:', middle);
    // console.log('Keepers:', keeper);
  };

  const submitHandler = async (rows) => {
    const rowData = rows.map((row) => row.original);
  
    // Check if the number of players is valid
    if (rowData.length > 1) {
      toast.error('Too many player selects.');
      return;
    }else{
      toast.success('Your team has been selected.');

      try {
        const responseFromApiCall = await selectionTeam({
          name: rowData[0].name, 
          formation: rowData[0].formation,
          team: rowData[0].team,
        }).unwrap();
      } catch (err) {
        toast.error(err?.data?.errors[0]?.message || err?.error);
      }
    }
  };

  const columns = [
    {
      accessorKey: 'avatar',
      header: '',
      Cell: ({ cell }) => <Avatar src={cell.getValue()} />,
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'formation',
      header: 'Formation',
    },
    {
      id: 'edit',
      accessorKey: 'edit',
      header: 'Display Team',
      Cell: ({ row }) => (
        <Button onClick={() => handleEdit(row.original)}>Display</Button>
      ),
    },
    {
      id: 'delete',
      accessorKey: 'delete',
      header: 'Delete Team',
      Cell: ({ row }) => (
        <Button color="error" onClick={() => handleDeleteClick(row.original._id)}>Delete</Button>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5],
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  });

  return (
    <>
      <Stack sx={{ m: '2rem 0' }}>
        <Typography variant="h4">List of Teams</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <MRT_GlobalFilterTextField table={table} />
          <MRT_TablePagination table={table} />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell align="center" variant="head" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.Header ??
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow key={row.id} selected={row.getIsSelected()}>
                  {row.getVisibleCells().map((cell, _columnIndex) => (
                    <TableCell align="center" variant="body" key={cell.id}>
                      <MRT_TableBodyCellValue
                        cell={cell}
                        table={table}
                        staticRowIndex={rowIndex}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {isLoading && (
        <>
          {" "}
          <Loader />{" "}
        </>
      )}
        <Button
          disabled={!table.getIsSomeRowsSelected()} // Include teamName in the condition
          onClick={() => submitHandler(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Push to confirm the selection
        </Button>
        <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      </Stack>
      <div style={{ marginTop: '5rem' }}>
        <FootballFormation teamBuild={teamBuild} />
      </div>
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this team?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DisplayFormation;
