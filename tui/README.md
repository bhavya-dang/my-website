# SSH TUI App

This TUI application is built using TypeScript and neo-blessed for SSH terminal interface.

## Running Locally

To run the app locally, follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the application:
   ```bash
   npm run dev
   ```

## Deploying with OpenSSH ForceCommand

To deploy the application, you can use OpenSSH's ForceCommand in your SSH configuration:

```plaintext
ForceCommand /path/to/your/application
```
