import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useModalContext } from 'src/contexts/modal-context/modal-context';
import FilterModal from 'src/components/SearchBar/FilterModal';

export default function FilterItem() {
  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    openModal('Filter', <FilterModal />, { maxWidth: 'xsm' }, true);
  };

  return (
    <>
      <IconButton onClick={handleOpenModal}>
        <FilterListIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </>
  );
}
