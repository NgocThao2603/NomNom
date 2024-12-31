import { Avatar, Box, Button, Typography, TextField, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUserInfo, updateAvatar, updateUserInfo } from 'src/services';
import { UserInfo } from 'src/services/types';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<{ status: 'idle' | 'success' | 'fetching' | 'failed'; data: UserInfo | undefined }>({
    status: 'idle',
    data: undefined,
  });
  const [filePng, setFilePng] = useState<string>('');
  const [isEditing, setIsEditing] = useState<{ address: boolean; phone: boolean }>({ address: false, phone: false });
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  async function fetchUserInfo() {
    try {
      setUser({ status: 'fetching', data: undefined });
      const res = await getUserInfo();
      setUser({ status: 'success', data: res.data.user[0] });
    } catch (error) {
      setUser({ status: 'failed', data: undefined });
      console.error(error);
    }
  }

  async function uploadAvatar(file: File) {
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await updateAvatar(body);
      setFilePng(res.data.data.filename);
      toast.success('Upload successfully');
    } catch (error) {
      setFilePng('');
      toast.error('Upload failed');
      console.error(error);
    }
  }

  async function handleSave() {
    const body = {
      username: user.data?.username,
      email: user.data?.email,
      address,
      phone,
    };
    try {
      await updateUserInfo(body);
      toast.success('Update successfully');
      await fetchUserInfo();
    } catch (error) {
      toast.error('Update failed');
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (user.status === 'success' && user.data) {
      setAddress(user.data.address);
      setPhone(user.data.phone);
    }
  }, [user]);

  return (
    <>
      <Box sx={{ py: 3, display: 'flex', alignItems: 'center', borderBottom: '1px solid #E0E0E0' }}>
        <label htmlFor="upload-avatar">
          <input
            style={{ display: 'none' }}
            id="upload-avatar"
            name="upload-avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                uploadAvatar(file);
              }
            }}
          />
          <Avatar src={`https://nomnom-pmp0.onrender.com/uploads/${filePng}`} sx={{ width: 150, height: 150, cursor: 'pointer' }} />
        </label>
        <Box sx={{ ml: 5 }}>
          <Typography variant="h3">{user.data?.username}</Typography>
          <Typography variant="body1">{user.data?.email}</Typography>
        </Box>
      </Box>
      <Box sx={{ my: 5, mx: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PlaceIcon sx={{ fontSize: '40px', mr: 5 }} />
          <TextField
            sx={{ width: '50%' }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setIsEditing((prev) => ({ ...prev, address: !prev.address }))}>
                  <EditIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PhoneIcon sx={{ fontSize: '40px', mr: 5 }} />
          <TextField
            sx={{ width: '50%' }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setIsEditing((prev) => ({ ...prev, phone: !prev.phone }))}>
                  <EditIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button size="large" variant="contained" onClick={handleSave}>
          {t('views.setting.components.button')}
        </Button>
      </Box>
    </>
  );
}
