# Picky: AI-Powered Image Gallery

## Project Overview

Picky is an online image gallery designed to manage and search through a user's extensive library of digital photos. The app's unique selling point is its ability to search and filter images based on natural language queries, including the names of people in the images. Picky delivers relevant images quickly and accurately by leveraging a combination of advanced concepts and AI tools, such as machine vision, vector or graph databases, and Large Language Models (LLMs).

## Tech Stack

### Front-end
- React.js
- Next.js
- Tailwind CSS

### Back-end
- Node.js with Express
- Supabase
- Additional tools (to be determined):
  - Vector database
  - Relevant APIs

## Key Features

1. **Image Upload**: Users can select and add images to their gallery.

2. **Image Analysis**: Each uploaded image is analyzed for:
   - Objects (including text, inanimate objects, people, landmarks)
   - Scene detection
   - Qualitative aspects (description of what the image is showing)

3. **Manual Metadata**: Users can manually add additional metadata, such as:
   - Geolocation where the photo was taken
   - Names of people appearing in the photo

4. **Data Persistence**: All image data is stored in an optimal database for natural language searching (e.g., vector database for RAG-style querying).

5. **Facial Recognition**: The system can perform facial recognition to:
   - Match faces with known people in the datastore
   - Automatically tag people in new photos

6. **Gallery View**: A user interface allows browsing through all images in a masonry-style layout.

7. **Semantic Search**: Users can speak or type requests, and the system will:
   - Execute a semantic search
   - Identify images matching the query
   - Display a filtered list in a masonry-style layout

## Implementation Details

(To be added as development progresses)

