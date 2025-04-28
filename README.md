# Hapa Task Manager

## Overview

This repository contains the prototype for the Hapa Task Manager, a module designed for the [Hapa.ai](https://github.com/dl3385github/Hapa.ai) decentralized ecosystem. Its primary purpose is to manage tasks that originate from decisions made by Hapa Consuls (small, triadic user groups).

In the Hapa system, Consuls discuss and vote on proposals. Once a proposal requiring action (a task) is approved (reaching a 2/3 majority), its details (creator DID, task description, associated Consul ID, vote results, etc.) are intended to be automatically relayed to the Task Manager. This application provides the interface for users (Consul members or assigned individuals) to view, track, and manage these approved tasks.

This current version simulates this workflow, allowing users to:
*   View tasks based on their status (All, Approved/My Tasks, Pending Invitation, Completed).
*   Simulate the creation of tasks as if they arrived from a Consul vote (marked as approved or rejected).
*   Accept tasks that are pending (simulating an invitation to join or take ownership).
*   View detailed information for each task.
*   Add comments to tasks for discussion and updates.

The goal is to create a realistic user experience for managing tasks within the Hapa framework, laying the groundwork for future integration with decentralized storage (Hypercore) and other Hapa modules like the Flowchart App.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js)
*   Git (Optional, for cloning)

### Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url> # Replace with your repo URL
    cd Hapa_TaskManager
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Hapa_TaskManager
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

1.  **Start the Vite development server:**
    ```bash
    npm run dev
    ```
2.  **Open your browser:**
    Navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

3.  **Vite Commands:** While the server is running, you can press `h` in the terminal to see Vite's help menu for commands like restarting the server, etc.

The application should now be running in development mode with hot module replacement.

## Features (MVP)

*   **Dashboard:** Displays an overview of all tasks currently stored locally.
*   **Filtered Task Views:**
    *   *My Tasks:* Shows only tasks with `approved` status.
    *   *Pending Invitations:* Shows only tasks with `pending` status.
    *   *Completed Tasks:* Shows only tasks with `completed` status.
*   **Task Creation Simulation:** A form to simulate the arrival of a new task (either `approved` or `rejected`) with necessary metadata like title, description, priority, simulated creator DID, and simulated Consul ID.
*   **Task Detail View:** Displays all metadata associated with a task, including timestamps, creator, assignee (if any), Consul ID, priority, tags, and deadline.
*   **Accept Pending Tasks:** A button appears on tasks in the "Pending Invitations" view, allowing the user to change the status to `approved`.
*   **Commenting System:** Allows users to view and add comments to individual tasks.
*   **Local Persistence:** Uses `localforage` (IndexedDB) to store task data in the browser.
*   **Responsive Design:** Basic responsiveness for usability on different screen sizes.

## Tech Stack

*   **Frontend Framework:** [React](https://reactjs.org/) (v18+)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/) component library
*   **Routing:** [React Router DOM](https://reactrouter.com/) (v6)
*   **Form Management:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
*   **Local Storage:** [localForage](https://localforage.github.io/localForage/) (wrapper for IndexedDB)
*   **Utility Libraries:** [date-fns](https://date-fns.org/), [uuid](https://github.com/uuidjs/uuid)
*   **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (specifically Feather Icons - `fi`)
*   **Package Manager:** [npm](https://www.npmjs.com/)

## Project Structure

```
/Hapa_TaskManager
|-- /docs/                  # Requirement & design documents
|   |-- *.md
|-- /public/                # Static assets
|-- /src/
|   |-- /assets/            # Images, fonts, etc.
|   |-- /components/        # Reusable UI components (Layout, Task, Common, etc.)
|   |   |-- /Auth/
|   |   |-- /Common/
|   |   |-- /Consul/
|   |   |-- /Layout/
|   |   |-- /Task/
|   |-- /contexts/          # React Context providers (future use)
|   |-- /hooks/             # Custom React hooks (future use)
|   |-- /pages/             # Page-level components corresponding to routes
|   |-- /services/          # Data fetching/management logic (e.g., taskService.ts)
|   |-- /types/             # TypeScript type definitions (e.g., task.ts)
|   |-- /utils/             # Utility functions (e.g., taskUtils.ts)
|   |-- App.tsx             # Main application component with routing
|   |-- index.css           # Global CSS and Tailwind directives
|   |-- main.tsx            # Application entry point
|-- .gitignore              # Specifies intentionally untracked files
|-- index.html              # HTML entry point
|-- LICENSE                 # Project license (Add your preferred license here)
|-- package-lock.json       # Exact dependency versions
|-- package.json            # Project metadata and dependencies
|-- postcss.config.js       # PostCSS configuration (for Tailwind)
|-- README.md               # This file
|-- tailwind.config.js      # Tailwind CSS configuration
|-- tsconfig.json           # TypeScript compiler options for the project
|-- tsconfig.node.json      # TypeScript compiler options for Node.js context (Vite config)
|-- vite.config.ts          # Vite build tool configuration
```

### Key Files & Folders

*   **/docs**: Contains all project requirement documents (PRD, Frontend, Backend, Schema, API, User Flow, Libraries).
*   **/src**: Main application source code.
*   **/src/components**: Reusable UI pieces. Organized by feature (Task, Layout, Consul) or common usage.
*   **/src/pages**: Top-level components rendered by the router for each specific view/URL.
*   **/src/services**: Modules responsible for handling data logic (currently `taskService.ts` interacting with `localforage`).
*   **/src/types**: TypeScript interfaces and type definitions, ensuring data consistency (`task.ts`).
*   **/src/utils**: Helper functions used across the application (`taskUtils.ts`).
*   **src/App.tsx**: Defines the main application layout and routing structure using `react-router-dom`.
*   **src/main.tsx**: The entry point where the React application is mounted to the DOM.
*   **package.json**: Lists project dependencies and scripts (`npm run dev`, `npm run build`).
*   **vite.config.ts**: Configures the Vite development server and build process, including path aliases.
*   **tailwind.config.js**: Configures Tailwind CSS and DaisyUI themes/plugins.
*   **README.md**: Provides an overview and instructions for the project (this file).

## AI-Assisted Development Tools

This project leveraged several AI tools to facilitate development:

*   **Deepseek R1:** Used for initial comprehensive research into task management applications and conceptualizing integration strategies within the Hapa framework. Helped generate the initial project description and outline.
*   **Anthropic Claude 3.7:** Employed for scaffolding the project structure, generating detailed requirement documents based on initial outlines, and refining component architecture.
*   **Google Gemini 2.5 Pro (Experimental 03-25):** Utilized extensively for pair programming, implementing features, writing component code, debugging issues, and iterating on the application logic based on feedback.

The collaborative use of these AI tools significantly accelerated the research, planning, and implementation phases of this prototype.

## Development Journal Summary

*   **12:00 PM - 1:00 PM:** Initial research phase. Analyzed existing task manager and flowchart applications to understand core features and potential integration points for the Hapa ecosystem.
*   **1:00 PM - 2:00 PM:** Break.
*   **2:00 PM - 2:30 PM:** Documentation and structuring. Defined application scaffolding, file/database structures, required libraries, core features, and generated initial requirement documents using AI assistance.
*   **2:30 PM - 4:30 PM:** Core development. Built the basic React structure, implemented components (Layout, TaskList, TaskItem, TaskForm, TaskDetailView, Comments), set up local storage service (`taskService.ts`), and iterated on functionality with AI pair programming and debugging.
*   **4:30 PM - 5:00 PM:** Break & Version Control. Finalized initial MVP code and pushed to GitHub repository.
*   **5:00 PM - 5:30 PM:** Documentation & Planning. Updated README, reviewed generated documentation, and planned next steps for refinement.

## Future Enhancements

*   Replace simulated data/logic with real user authentication (DID) and Consul data.
*   Integrate with Hypercore for decentralized data storage and P2P syncing.
*   Implement robust error handling and user feedback mechanisms.
*   Add functionality to manage Consul membership display.
*   Develop the task status update flow (e.g., marking tasks as 'in-progress' or changing priority after creation).
*   Refine UI/UX based on the design principles outlined in the documentation.
*   Implement the linking functionality with the Hapa Flowchart App.
*   Integrate the μCredit system for task rewards.

## Contributing

This is currently a development prototype by Don Lee. Contributions are welcome in later stages.

## License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2025 Don Lee / Hapa.ai

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

BANANA CLAUSE: This code is free as Hapa.ai is an open-source network. But please doate Bananas to Don Lee if you think this is useful.