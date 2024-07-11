import React, { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Chatbot } from '@sisense/sdk-ui/ai';
import { ThemeProvider, getDefaultThemeSettings, ThemeSettings } from '@sisense/sdk-ui';

function App() {
  const defaultThemeSettings = getDefaultThemeSettings();
  
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    ...defaultThemeSettings,
    aiChat: {
      ...defaultThemeSettings.aiChat,
      backgroundColor: '#ffffff',
      primaryTextColor: '#000000',
      borderRadius: '4px',
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

  return (
    <div className="App" style={{ display: 'flex' }}>
      <header className="App-header" style={{ flex: 1 }}>
        <ThemeProvider theme={themeSettings}>
          {chatbotVisible && (
            <Chatbot
              width={400}
              height={700}
            />
          )}
        </ThemeProvider>
      </header>
      <Box style={{ flex: 1, padding: '50px' }}>
        <h3>Chatbot Theme Settings</h3>
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
        <p>For additional customization settings, please visit ThemeSettings Documentation <a href="https://sisense.dev/guides/sdk/modules/sdk-ui/interfaces/interface.ThemeSettings.html" target="_blank" rel="noopener noreferrer">ThemeSettings Documentation</a>.</p>
      </Box>
    </div>
  );
}

export default App;
