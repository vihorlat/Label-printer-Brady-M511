# Portable Printer

A web application for printing images and PDFs using Brady portable printers via Bluetooth.  
This project leverages the Brady Web SDK to enable browser-based communication with supported Brady printers.

## Features

- **Bluetooth Printer Discovery:** Scan and connect to Brady printers via Bluetooth.
- **Print Images & PDFs:** Upload images (`.jpg`, `.jpeg`, `.png`) or PDF files for printing.
- **Label Template Picker:** Quickly select predefined label templates for printing.
- **Custom Print Options:**
  - Set number of copies
  - Choose cut options (End of Job, End of Label, Never, Cut After Row, Use Printer Settings)
  - Specify rows for cut (when applicable)
- **Printer Status:** View real-time printer status, supply info, and error messages.
- **Feed & Cut:** Manual feed and cut functionality.
- **Disconnect:** Disconnect from printer.
- **Loading Spinner:** Visual feedback during long operations.

## Supported Frameworks

- **Vanilla JavaScript / HTML (No framework required)**
- **React**
- **Angular**
- **Vue**
- **Node.js (as a local server, but SDK is browser-focused)**
- The Brady Web SDK is framework-agnostic and can be used in any front-end project that supports ES6 modules.

> **Note:** The SDK runs in modern browsers supporting the Web Bluetooth API (e.g., Chrome, Edge, Opera). iOS and Firefox are not supported due to Web Bluetooth limitations.

## Important SDK Notes

- **Browser Requirements:**  
  Web Bluetooth is only supported in Chrome, Edge, and Opera. Use HTTPS or `localhost` for development.
- **Permissions:**  
  The user must manually select a Bluetooth device; auto-connect is not permitted by browser security.
- **Printer Compatibility:**  
  Supported with Brady printers implementing the relevant Bluetooth protocols (see SDK docs for updated list).
- **Single Page App Support:**  
  The SDK can be integrated into any SPA or static site.

## Key SDK Resources

- [Web SDK Overview](https://sdk.bradyid.com/web_sdk_overview/):  
  Describes features, supported printers, and integration basics.
- [SDK Setup Guide](https://sdk.bradyid.com/web_sdk_setup/):  
  Instructions for installing via npm, script tags, and initializing the SDK.
- [SDK API Reference](https://sdk.bradyid.com/web_sdk_api/):  
  Detailed documentation for available classes, methods, and event handling.
- [NPM Package](https://www.npmjs.com/package/@bradycorporation/brady-web-sdk):  
  Distribution and installation instructions.

## Getting Started

### Prerequisites

- A compatible Brady printer with Bluetooth support
- Node.js and npm (for local development)
- Modern web browser (Chrome recommended for Web Bluetooth API support)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Novakowsky/portable-printer.git
   cd portable-printer
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run a local server:**
   You can use any static file server, e.g.:
   ```sh
   npx serve .
   ```
   or
   ```sh
   npm install -g http-server
   http-server .
   ```
   > **Note:** Web Bluetooth only works with HTTPS or on `localhost`.

4. **Access the app:**
   Open your browser and go to `http://localhost:5000` (or the port provided by your server).

## Usage

1. **Start Bluetooth Scan:** Click "Start Bluetooth Scan" and select your printer.
2. **Upload File:** Use the file input to upload an image or PDF, or select a label template at the bottom.
3. **Print Settings:** Set number of copies and cut options as needed.
4. **Print:** Click "Print" to send your file to the printer.
5. **Feed/Cut/Disconnect:** Use these controls as needed.

## File Structure

```
index.html         # Main HTML file
script.js          # Frontend logic, printer communication, file handling
style.css          # Styles
/templates/        # Folder for label template PDFs
```

## Dependencies

- [@bradycorporation/brady-web-sdk](https://www.npmjs.com/package/@bradycorporation/brady-web-sdk)
- [PDF.js](https://mozilla.github.io/pdf.js/)
- [Node.js](https://nodejs.org/) (for local development)

## Customizing Templates

To add your own label templates, place PDF files in the `templates/` folder and update the label picker in `index.html` as needed.

## Troubleshooting

- **Bluetooth Not Supported:** Use Chrome or another browser that supports the Web Bluetooth API.
- **Printer Not Found:** Ensure your printer is powered on, in range, and supports Bluetooth.
- **PDFs Not Printing Correctly:** Only the first page of multi-page PDFs will be used.
- **Web Bluetooth Security:** Scanning and connecting to printers must be triggered by a user gesture (e.g., button click).

## License

MIT License

---

*This project is not officially affiliated with Brady. For SDK documentation, visit the [Brady Web SDK](https://www.npmjs.com/package/@bradycorporation/brady-web-sdk) page and the [Brady SDK Documentation Portal](https://sdk.bradyid.com/).*
