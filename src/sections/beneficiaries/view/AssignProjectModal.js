import LoadingOverlay from '@components/LoadingOverlay';
import { useErrorHandler } from '@hooks/useErrorHandler';
import useLoading from '@hooks/useLoading';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

export default function AssignProjectModal({
  open,
  projects,
  loadingKey = 'assignProject',
  handleClose,
  assignProject,
  beneficraryId,
  refreshData,
  refresh,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [project, setProject] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleError } = useErrorHandler();
  const handleChange = (e) => {
    setProject(e.target.value);
  };

  const handleAssign = async () => {
    setLoading(true);
    try {
      await assignProject(beneficraryId, { projectId: project });
      enqueueSnackbar('Asiigned to projects', {
        variant: 'success',
      });
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
    handleClose();
    refreshData();
    setProject('');
  };
  useEffect(() => {}, [refresh]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <LoadingOverlay open={loading}>
          <DialogTitle>Assign Project</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>Select Project To Assign Beneficiary</DialogContentText>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Projects</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={project}
                label="Project "
                onChange={handleChange}
              >
                {projects?.map((el) => (
                  <MenuItem key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAssign} disabled={project === ''}>
              Add
            </Button>
          </DialogActions>
        </LoadingOverlay>
      </Dialog>
    </div>
  );
}
