import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs, { Dayjs } from 'dayjs';

const TodoDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const dialogType = props.action;

  const handleClickOpen = () => {
    if (props.itemToEdit) {
      setTitle(props.itemToEdit.todo);
      setDescription(props.itemToEdit.description);
      setDate(dayjs(props.itemToEdit.date));
    } else {
      setDate(dayjs(new Date(Date.now())));
    }

    setOpen(true);
  };

  const clearData = () => {
    setTitle('');
    setDescription('');
    setDate(null);
  };

  const handleClose = () => {
    setOpen(false);
    clearData();
  };

  const edit = () => {
    props.editItem({
      id: props.itemToEdit.id,
      select: false,
      todo: title,
      description: description,
      deadline: dayjs(date).format('YYYY-MM-DD'),
      done: props.itemToEdit.done,
    });
    setOpen(false);
    clearData();
  };

  const add = () => {
    props.onAddTodo({
      select: false,
      todo: title,
      description: description,
      deadline: dayjs(date).format('YYYY-MM-DD'),
      done: false,
    });
    setOpen(false);
    clearData();
  };

  return (
    <div>
      <Button
        variant={dialogType === 'Add' ? 'contained' : 'outlined'}
        disabled={dialogType === 'Edit' && !props.itemToEdit}
        onClick={handleClickOpen}
      >
        {dialogType} To Do Item
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ padding: '20px' }}>
        <DialogTitle>{dialogType} todo</DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingTop: '20px',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              marginTop: '20px',
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Deadline"
              value={date}
              onChange={(value) => setDate(dayjs(value))}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={dialogType === 'Add' ? add : edit}
            disabled={!(title && description)}
          >
            Save
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoDialog;
