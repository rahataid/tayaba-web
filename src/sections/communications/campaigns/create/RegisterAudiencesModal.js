import { LoadingButton } from '@mui/lab';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { CommunicationService } from '@services/communications';
import { getLabelsByValues } from '@utils/arrays';
import PropTypes from 'prop-types';
import { useState } from 'react';

function formatArray(arr) {
  const map = new Map();
  arr.forEach((str) => {
    const [referenceIdStr, phoneStr] = str.split(', ');
    const referenceId = parseInt(referenceIdStr.split(':')[1]);
    const phone = phoneStr.split(':')[1];
    if (!map.has(referenceId)) {
      map.set(referenceId, phone);
    }
  });
  const output = [];
  map.forEach((phone, referenceId) => {
    output.push({ referenceId, phone });
  });
  return output;
}

const RegisterAudiencesModal = ({ isOpen, onClose, list }) => {
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [formattedSelect, setFormattedSelect] = useState([]);
  const [registering, setRegistering] = useState(false);

  const handleSelectBeneficiaries = async (e) => {
    const { value } = e.target;
    const formatted = formatArray(value);
    setFormattedSelect(formatted);

    setSelectedBeneficiaries(value);
  };

  const onRegister = async () => {
    try {
      setRegistering(true);
      const withDetails = formattedSelect.map((d) => ({
        details: {
          ...d,
        },
      }));

      await CommunicationService.bulkAddAudiences(withDetails);
      onClose();
      setRegistering(false);
    } catch (error) {
      setRegistering(false);
      console.log(error);
    }
  };

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <DialogTitle>Register Beneficiaries.</DialogTitle>
      <DialogContent>
        <Typography>Register Existing Beneficiaries as audience of the campaign.</Typography>
        <Stack mt={2}>
          <Select
            value={selectedBeneficiaries}
            multiple
            input={<OutlinedInput label="Select Beneficiaries" />}
            renderValue={(selected) => getLabelsByValues(list, selected).join(', ')}
            onChange={handleSelectBeneficiaries}
          >
            {list.map((audience) => (
              <MenuItem key={audience.value} value={audience.value}>
                <Checkbox checked={selectedBeneficiaries.indexOf(audience.value) > -1} />
                <ListItemText primary={audience.label} />
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton loading={registering} onClick={onRegister} variant="outlined">
          Register
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

RegisterAudiencesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
};

export default RegisterAudiencesModal;
