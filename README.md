### `README.md` File

```markdown
# Node.js Application - Auto Run Every 5 Minutes

This project is a Node.js application that automatically runs every 5 minutes using cron jobs. It is packaged into a standalone executable (`.exe` for Windows) so that your client can easily run the app without needing Node.js installed.

## Features:
- Fetches data from an internal API (`/data` endpoint).
- Sends the fetched data to another API via a POST request.
- Runs automatically every 5 minutes using a cron job.
- The executable can be scheduled to run at startup or on a schedule using Windows Task Scheduler.

## Steps to Use

### Prerequisites:
- **Node.js** and **npm** (for development purposes).
- **pkg** (for packaging the app into an executable).

### 1. Install `pkg` to Package the Application
First, install `pkg` globally on your machine to package the app into a standalone executable.

```bash
npm install -g pkg
```

### 2. Package the Node.js Application into an Executable
Run the following command to package your Node.js application into a Windows executable file (`myApp.exe`):

```bash
pkg index.js --targets node18-win-x64 --output myApp.exe
```

This command will create a `myApp.exe` file in the current directory. You can replace `app.js` with the name of your main application file.

### 3. Distribute the Executable
Once the executable is created, you can distribute the `myApp.exe` file to your client. The client can then run this `.exe` file without needing to install Node.js or any dependencies.

### 4. Setting Up the Application to Run Automatically Every 5 Minutes
To ensure the application runs every 5 minutes, you can set up a task to execute the `.exe` file using **Windows Task Scheduler**.

#### Steps to Add the Executable to Windows Task Scheduler:
1. **Open Task Scheduler**:
   - Press `Win + R`, type `taskschd.msc`, and press Enter.

2. **Create a Basic Task**:
   - In the Task Scheduler window, click on **Create Basic Task** from the right-hand side.
   - Set a name for the task (e.g., **Run Node.js App every 5 minutes**).

3. **Set the Trigger**:
   - Choose **Daily** (or select another suitable option).
   - Set the start date and time.
   - Set the **Repeat Task every** option to **5 minutes** for a duration of **Indefinitely**.

4. **Set the Action**:
   - Select **Start a Program**.
   - Browse to the location of your executable (`myApp.exe`).
   - Click **Next** and then **Finish** to save the task.

Now, the application will run automatically every 5 minutes based on the schedule you set.

### 5. Running the Application at Windows Startup (Optional)
If you want the application to run automatically when the PC starts, you can add the task to **Windows Startup**:

1. **Create a Task for Startup**:
   - Open **Task Scheduler** as described above.
   - Click **Create Task** instead of **Create Basic Task** for more advanced options.
   
2. **Configure the Trigger**:
   - In the **Triggers** tab, click **New** and choose **At startup** from the dropdown menu.
   
3. **Configure the Action**:
   - In the **Actions** tab, click **New** and select **Start a Program**.
   - Browse to your `myApp.exe` executable.

4. **Set the Task to Run on Startup**:
   - Ensure that the **Run with highest privileges** checkbox is selected to avoid any permission issues.
   
5. **Save and Exit**:
   - Click **OK** to save the task. Now the application will run every time the computer starts.

### 6. Setting Up the Application on Linux/Mac (Optional)
If you are using Linux or MacOS, you can use `cron` to run the executable every 5 minutes.

#### Steps to Setup Cron Job:
1. Open a terminal and type:
   ```bash
   crontab -e
   ```

2. Add the following line to run the executable every 5 minutes:
   ```bash
   */5 * * * * /path/to/myApp
   ```

3. Save and exit the editor.

Now, the application will run every 5 minutes.

### 7. Notes
- If you are running the application on a **Windows** system, make sure you have the correct permissions to run the `.exe` file, especially if it requires network access or file system access.
- For **Linux/Mac** users, ensure that the executable has the correct permissions using `chmod +x myApp`.

### 8. Troubleshooting
- **Application not running**: Make sure you have set up the correct task schedule or cron job.
- **Permissions**: If the application doesn't run automatically, check if the task requires **Administrator permissions** to run successfully.
- **Error Logs**: Check the logs printed by the application in the command line or via a log file to troubleshoot issues.

### 9. Contact
If you encounter any issues or need further help, feel free to contact support at **support@example.com**.

---

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Explanation of the Sections:

1. **Introduction**: Overview of the project, its features, and how it runs automatically every 5 minutes using cron jobs.
2. **Prerequisites**: Instructions on installing `pkg`, which is used to package the Node.js application into an `.exe` file.
3. **Steps to Use**: Detailed instructions on how to package the app, distribute the `.exe` file, and set up the task to run every 5 minutes using Windows Task Scheduler.
4. **Running the Application at Startup**: Instructions for making the application run when the system starts, either through Task Scheduler or cron jobs.
5. **Optional Linux/Mac Setup**: Instructions for setting up a cron job for Linux/Mac users.
6. **Troubleshooting**: Common issues and how to resolve them.

---

### How to Create the Executable:

1. **Install pkg**:
   - Run `npm install -g pkg` to install `pkg`.

2. **Package your Node.js app**:
   - Run `pkg app.js --targets node18-win-x64 --output myApp.exe` to generate the `.exe` file.

3. **Distribute `myApp.exe`**:
   - Share the executable with your client. They can run it directly on their Windows machine.

4. **Automate Startup/Run Every 5 Minutes**:
   - Follow the instructions in the README to set up automatic execution either at startup or using Task Scheduler for periodic execution every 5 minutes.

With this setup, the client can simply execute the `.exe` file, and it will run automatically according to the defined schedule (either every 5 minutes or on startup).
