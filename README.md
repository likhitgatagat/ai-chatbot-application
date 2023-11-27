# ai-chatbot-application
This is an AI assignment where we were asked to create a custom conversational AI agent that responds using the embeddings.


This web application integrates an AI chatbot with PDF upload, context setting, and enhanced conversation capabilities.

I first started with developing a web app, allowing user to chat with the AI agent by providing a place to enter their query and see the responses obtained by the system. This is similar to any instant messaging system where our responses are coming from the AI agent. Further, I extended the Chatbot by customising it to generate responses confined to
domain-specific knowledge gathered by supplying a PDF to the system. I leverage this capability to build a more custom chatbot experience. OpenAI provides a capability known as text embeddings to measure the relatedness of text strings. I used embedding model APIs of OpenAI to generate the embedding of a given PDF, to receive back its embedding data. I then stored the embeddings in the AirTable Base, a cloud-powered Excel and used it as a database for providing domain-specific responses. Next, when a user provides a prompt, I get the embedding data of that specific prompt. I then used a simple cosine similarity check between the embedding data of the prompt that was asked with the embedding data of the information stored in our database. Now, When the user makes a prompt of "Who is Swapnil Gundecha", we receive the embedding data for that specific prompt. I then compute the cosine similarity for the embedding data in our database with the embedding data of the prompt question. This gave me a number between 0 to 1 for each comparison. The embedding data with the highest cosine score is the text that is most similar to what the user is asking. I then took that text blurb and embedded it within a “super” prompt that I sent to OpenAI. Now when I ask a question to our chatbot that requires some context, the final prompt is built behind the scenes before being sent to OpenAI. In the end, I get a more relevant answer returned by the Chatbot!

## Installation

To run the application locally, follow these steps:

### Prerequisites

- Node.js installed on your machine
- Create an account on OpenAI and generate the API key https://platform.openai.com/api-keys
- Create an account on AirTable and generate AirTable Base ID and API Token. Create an account using below link:
https://airtable.com/invite/l?inviteId=invqTiecVaTN1pl7A&inviteToken=4e54bd60c0bbc678faa02b17e757b1c509f538df8813ef2ea2de2b6042b88949&utm_medium=email&utm_source=product_team&utm_content=transactional-alerts
- Create a base table with name some name, I create with "Likhit Gatagat Embeddings".
- By now you shall have OPENAI_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_API_KEY, and AIRTABLE_BASE_TABLE_NAME

### Clone the Repository

```bash
git clone https://github.com/likhitgatagat/ai-chatbot-application

```

# Edit Environment Variables

Open ChatGPTOpenAI in your favorite edior. Navigate to .env file and update the values of OPENAI_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_API_KEY, and AIRTABLE_BASE_TABLE_NAME to your own generated values.

# Install Dependencies

```bash
cd ai-chatbot-application
cd ChatGPTOpenAI
npm install
npm start
```

Application will start on port 5000

# Start/Spin up client side application

Open custom_chat_gpt_frontend in your favorite edior. Navigate to KnowledgeBase.jsx file and update the values of apiKey to your own generated key for Create, Update and Delete Operation on AirTable. Please note that AIRTABLE_API_KEY in previous step was specific to read data, we need to create a separate key for create, update and delete operation.
 
```bash
cd ai-chatbot-application
cd custom_chat_gpt_frontend
npm install
npm run dev
```
Application will start on port 3000

Navigate to your favorite browser and hit http://localhost:3000

You will see Chat prompt along with other UI elements.

That's it!!!


# Application Demo Link

https://www.youtube.com/watch?v=sbWAdFXIST8&t=2s 