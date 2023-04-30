import { TodoItem } from './Todo';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Radio } from '@mui/material';

const BasicTable = ({ rows, select, done }) => {
  const onTodoSelect = (row: TodoItem) => {
    select(row);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>To do</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Done</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: TodoItem) => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              className={row.done ? 'done' : ''}
            >
              <TableCell component="th" scope="row">
                <Radio checked={row.select} onClick={() => onTodoSelect(row)} />
              </TableCell>
              <TableCell>{row.todo}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.deadline}</TableCell>
              <TableCell>
                <Checkbox checked={row.done} onClick={() => done(row)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
