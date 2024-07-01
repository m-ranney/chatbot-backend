# Sisense Chatbot Customization Demo

This project showcases the customization options for the Sisense chatbot using dropdowns to update the ThemeSettings provided by the Sisense Compose SDK.

## Getting Started

### Prerequisites

To run this application, ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later)
- @sisense/sdk-ui: 1.13.0

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/sisense-chatbot-demo.git
   cd sisense-chatbot-demo
   ```

2. Install the necessary packages:

   ```sh
   npm install
   ```

### Configuration

To configure the application, you need to update the `SisenseContextProvider` in the `index.tsx` file with your Sisense server URL and API token.

1. Open `src/index.tsx`.

2. Locate the `SisenseContextProvider` component and update the following fields:

   ```tsx
   <SisenseContextProvider
     serverUrl="YOUR_SISENSE_SERVER_URL"
     apiToken="YOUR_SISENSE_API_TOKEN"
   >
   ```

### Running the Application

To start the application, run:

```sh
npm start
```

### Chatbot Customization

```tsx

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

```

```tsx
        <ThemeProvider theme={themeSettings}>
          {chatbotVisible && (
            <Chatbot
              width={400}
              height={700}
            />
          )}
        </ThemeProvider>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
