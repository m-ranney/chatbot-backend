import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Chatbot } from '@sisense/sdk-ui/ai';
import { ThemeProvider, getDefaultThemeSettings, ThemeSettings } from '@sisense/sdk-ui';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const ChatbotComponent: React.FC = () => {
  const defaultThemeSettings = getDefaultThemeSettings();
  const navigate = useNavigate();

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    ...defaultThemeSettings,
    aiChat: {
      ...defaultThemeSettings.aiChat,
      backgroundColor: '#ffffff',
      primaryTextColor: '#000000',
      borderRadius: '8px',
    },
  });

  const [chatbotVisible, setChatbotVisible] = useState(true);

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setThemeSettings((prevSettings) => ({
      ...prevSettings,
      aiChat: {
        ...prevSettings.aiChat,
        [name as keyof typeof prevSettings.aiChat]: value === 'none' ? false : value,
      },
    }));
  };

  const handleVisibilityChange = (event: SelectChangeEvent<string>) => {
    setChatbotVisible(event.target.value === 'visible');
  };

  // Logout Handler: Remove token from cookies and navigate to login page
  const handleLogout = () => {
    document.cookie = 'sisenseToken=; Max-Age=-99999999; path=/;';
    localStorage.removeItem('sisenseToken');
    localStorage.removeItem('token');
    localStorage.removeItem('sisenseUrl');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        padding: '40px',
      }}
    >
      <Box sx={{ display: 'flex', gap: '40px', width: '100%', maxWidth: '1200px' }}>
        <Paper elevation={3} sx={{ padding: '30px', flex: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Customize Chatbot Settings
          </Typography>
          <Divider sx={{ marginBottom: '20px' }} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Background Color</InputLabel>
            <Select
              value={themeSettings.aiChat?.backgroundColor}
              onChange={handleThemeChange}
              name="backgroundColor"
            >
              <MenuItem value="#ffffff">White</MenuItem>
              <MenuItem value="#f0f0f0">Light Grey</MenuItem>
              <MenuItem value="#000000">Black</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Text Color</InputLabel>
            <Select
              value={themeSettings.aiChat?.primaryTextColor}
              onChange={handleThemeChange}
              name="primaryTextColor"
            >
              <MenuItem value="#000000">Black</MenuItem>
              <MenuItem value="#ff0000">Red</MenuItem>
              <MenuItem value="#00ff00">Green</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Border Radius</InputLabel>
            <Select
              value={themeSettings.aiChat?.borderRadius === false ? 'none' : themeSettings.aiChat?.borderRadius ?? ''}
              onChange={handleThemeChange}
              name="borderRadius"
            >
              <MenuItem value="4px">4px</MenuItem>
              <MenuItem value="16px">16px</MenuItem>
              <MenuItem value="24px">24px</MenuItem>
              <MenuItem value="none">None</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Chatbot Visibility</InputLabel>
            <Select
              value={chatbotVisible ? 'visible' : 'hidden'}
              onChange={handleVisibilityChange}
            >
              <MenuItem value="visible">Visible</MenuItem>
              <MenuItem value="hidden">Hidden</MenuItem>
            </Select>
          </FormControl>
          <Divider sx={{ marginTop: '30px', marginBottom: '20px' }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ marginRight: '10px' }}
            >
              Logout
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ padding: '30px', flex: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Chatbot Interface
          </Typography>
          <Divider sx={{ marginBottom: '20px' }} />
          <ThemeProvider theme={themeSettings}>
            {chatbotVisible && (
              <Box>
                <Chatbot width={400} height={700} />
              </Box>
            )}
          </ThemeProvider>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatbotComponent;
