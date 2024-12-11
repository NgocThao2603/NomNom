import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useModalContext } from 'src/contexts/modal-context/modal-context';
import FilterModal from 'src/components/SearchBar/FilterModal';

export default function FilterItem() {
  const { t, i18n } = useTranslation();
  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    openModal(t('components.searchBar.filterModal.title'), <FilterModal />, { maxWidth: 'xsm' }, true);
  };

  return (
    <>
      <IconButton onClick={handleOpenModal}>
        <FilterListIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </>
  );
}
