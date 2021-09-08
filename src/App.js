import React from 'react';
import {
  ChakraProvider,
  Box,
  Center,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { extendTheme } from '@chakra-ui/react';
import { Logo } from './Logo';
import NatureCardDisplay from './Components/NatureCardDisplay';
import Header from './Components/Header';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { listTodos } from './graphql/queries';
import { createTodo as createNoteMutation, deleteTodo as deleteNoteMutation } from './graphql/mutations';
import { API, Storage } from 'aws-amplify';
const theme2 = extendTheme({
  colors: {
    blue: {
      100: '#93B5C6',
    },
    gray: {
      100: '#C9CCD5',
    },
    gray_pink: {
      100: '#E4D8DC',
    },
    pink: {
      100: '#FFE3E3',
    },
  },
});
const initialFormState = { name: '', description: '', image: ''}

function App() {

  const [notes, setNotes] = React.useState([]);
const [formData, setFormData] = React.useState(initialFormState);

React.useEffect(() => {
  fetchNotes();
}, []);

async function onChange(e) {
  if (!e.target.files[0]) return
  const file = e.target.files[0];
  setFormData({ ...formData, image: file.name });
  await Storage.put(file.name, file);
  fetchNotes();
}

async function fetchNotes() {
  const apiData = await API.graphql({ query: listTodos });
  const notesFromAPI = apiData.data.listTodos.items;
  await Promise.all(notesFromAPI.map(async note => {
    if (note.image) {
      const image = await Storage.get(note.image);
      note.image = image;
    }
    return note;
  }))
  setNotes(apiData.data.listTodos.items);
}

async function createNote() {
  if (!formData.name || !formData.description) return;
  await API.graphql({ query: createNoteMutation, variables: { input: formData } });
  if (formData.image) {
    const image = await Storage.get(formData.image);
    formData.image = image;
  }
  setNotes([ ...notes, formData ]);
  setFormData(initialFormState);
}

async function deleteNote({ id }) {
  const newNotesArray = notes.filter(note => note.id !== id);
  setNotes(newNotesArray);
  await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
}
  return (
    <ChakraProvider theme={theme2}>
      <Box textAlign="center" fontSize="xl" bg="blue.100">
        <div>
        <h1>My Notes App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <input
  type="file"
  onChange={onChange}
/>
      <button onClick={createNote}>Create Note</button>
      <div style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
      <h2>{note.name}</h2>
      <p>{note.description}</p>
      <button onClick={() => deleteNote(note)}>Delete note</button>
      {
        note.image && <img src={note.image} style={{width: 400}} />
      }
    </div>
          ))
        }
        </div>
        </div>
        <Header />
        <Center>
          <NatureCardDisplay />
        </Center>
        {/* <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid> */}
      </Box>
      <AmplifySignOut />
    </ChakraProvider>
  );
}

export default withAuthenticator(App);
