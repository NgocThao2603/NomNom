import { Avatar, Box } from '@mui/material';
import { use } from 'i18next';
import React, { useEffect, useState } from 'react';
import { getUserInfo, updateAvatar } from 'src/services';
import { UserInfo } from 'src/services/types';

export default function Settings() {
  const [user, setUser] = useState<{ status: 'idle' | 'success' | 'fetching' | 'failed'; data: UserInfo | undefined }>({
    status: 'idle',
    data: undefined,
  });

  async function fetchUserInfo() {
    try {
      setUser({ status: 'fetching', data: undefined });
      const user = await getUserInfo();
      setUser({ status: 'success', data: user.data });
    } catch (error) {
      setUser({ status: 'failed', data: undefined });
      console.error(error);
    }
  }

  async function uploadAvatar(file: File) {
    try {
      const res = await updateAvatar(file);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   fetchUserInfo();
  // }, []);

  return (
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
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
        <Avatar src="" sx={{ width: 100, height: 100, cursor: 'pointer' }} />
      </label>
    </Box>
  );
}
