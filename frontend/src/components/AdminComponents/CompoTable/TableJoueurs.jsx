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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { toast } from "react-toastify";
import { useSetTeamFormationMutation, useUpdateUserPositionMutation } from "../../../slices/adminApiSlice";
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

const countPositions = (players) => {
  let keeperCount = 0;
  let defenderCount = 0;
  let attackerCount = 0;
  let middleCount = 0;

  players.forEach(player => {
    switch (player.position) {
      case 'keeper':
        keeperCount++;
        break;
      case 'defender':
        defenderCount++;
        break;
      case 'attacker':
        attackerCount++;
        break;
      case 'middle':
        middleCount++;
        break;
      default:
        break;
    }
  });

  return {
    keeper: keeperCount,
    defender: defenderCount,
    attacker: attackerCount,
    middle: middleCount
  };
};

const getFormation = (formation) => {
  const formationConfig = compo[0][formation];
  if (!formationConfig) {
    throw new Error(`Formation ${formation} not found.`);
  }
  return formationConfig;
};

const compareFormationAndPositions = (formation, positions) => {
  return (
    formation.keeper === positions.keeper &&
    formation.defender === positions.defender &&
    formation.middle === positions.middle &&
    formation.attacker === positions.attacker
  );
};

const Example = ({ users }) => {
  const [selectedFormation, setSelectedFormation] = useState('');
  const [teamName, setTeamName] = useState(''); // Add state for the new text field
  const data = users;

  const [formation, setFormation] = useState("");
  const [team, setTeam] = useState("");
  // ajout zawill
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userPositionToUpdate, setUserPositionToUpdate] = useState("");
  const [open, setOpen] = useState(false); // State for modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user data

  const [createTeam, { isLoading }] = useSetTeamFormationMutation();
  const [updatePlayer] = useUpdateUserPositionMutation();

  const handleEdit = (userData) => {
    setSelectedUser(userData);
    setUserPositionToUpdate(userData.position);
    
    setOpen(true); // Open the modal
  };

  const handleFormationChange = (event) => {
    setSelectedFormation(event.target.value);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value); // Update state when text field value changes
  };

  const handleModalCloseWithoutLogging = () => {
    setOpen(false);
  };

  const handleModalSubmit = async () => {
    try {
      const responseFromApiCall = await updatePlayer({
        userId: selectedUser._id,
        position: userPositionToUpdate,
      });
      toast.success("User Updated Successfully.");
      setSelectedUser(null); // Clear selected user data
      setUserPositionToUpdate(""); // Clear user position update state
      setOpen(false); // Close the modal

      // Reload the page to reflect the updated data
      window.location.reload();
      
    } catch (err) {
      toast.error(err?.data?.errors[0]?.message || err?.error);
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
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'position',
      header: 'Position',
    },
    {
      id: 'edit',
      accessorKey: 'edit',
      header: 'Edit',
      Cell: ({ row }) => (
        <Button onClick={() => handleEdit(row.original)}>Edit</Button>
      ),
    },
  ];

  const submitHandler = async (rows) => {
    const rowData = rows.map((row) => row.original);

    // Check if the number of players is valid
    if (rowData.length > 11) {
      toast.error('Too many player selects.');
      return;
    }

    if (rowData.length < 11) {
      toast.error('Not enough player selects.');
      return;
    }

    // Validate formation and positions
    const testFormation = getFormation(selectedFormation);
    const testPositions = countPositions(rowData);

    if (compareFormationAndPositions(testFormation, testPositions)) {
      toast.success('Your request has been send.');
    } else {
      toast.error('Bad matching formation and player.');
      return;
    }

    // Proceed to create the team if formation and positions match
    try {
      const responseFromApiCall = await createTeam({
        name: teamName,
        formation: selectedFormation,
        team: JSON.stringify(rowData),
      }).unwrap();
    } catch (err) {
      toast.error(err?.data?.errors[0]?.message || err?.error);
    }
  }

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10],
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  });

  const formationKeys = Object.keys(compo[0]);

  return (
    <Stack sx={{ m: '2rem 0' }}>
      <Typography variant="h4">List of players</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <MRT_GlobalFilterTextField table={table} />
        <FormControl variant="outlined" sx={{ minWidth: 120 }} required>
          <InputLabel id="formation-select-label">Formation</InputLabel>
          <Select
            labelId="formation-select-label"
            id="formation-select"
            value={selectedFormation}
            onChange={handleFormationChange}
            label="Formation"
          >
            {formationKeys.map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField // Add the new text field
          required
          id="team-name"
          label="Team Name"
          value={teamName}
          onChange={handleTeamNameChange}
          sx={{ minWidth: 120 }}
        />
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
        disabled={!table.getIsSomeRowsSelected() || !selectedFormation || !teamName} // Include teamName in the condition
        onClick={() => submitHandler(table.getSelectedRowModel().rows)}
        startIcon={<FileDownloadIcon />}
      >
        Push to confirm the selection
      </Button>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />

      <Dialog open={open} onClose={handleModalCloseWithoutLogging}>
        <DialogTitle>Modifier la position</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="position-select-label">Position</InputLabel>
            <Select
              labelId="position-select-label"
              id="position-select"
              value={userPositionToUpdate}
              onChange={(e) => setUserPositionToUpdate(e.target.value)}
            >
              <MenuItem value="keeper">Keeper</MenuItem>
              <MenuItem value="defender">Defender</MenuItem>
              <MenuItem value="middle">Middle</MenuItem>
              <MenuItem value="attacker">Attacker</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalCloseWithoutLogging} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleModalSubmit} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Example;
