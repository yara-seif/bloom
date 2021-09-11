import React from 'react';
import { listTodos } from '../graphql/queries';
import { createTodo as createNoteMutation, deleteTodo as deleteNoteMutation } from './../graphql/mutations';
import { API, Storage } from 'aws-amplify';
import { Formik, Field, Form } from "formik";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button, Input, useDisclosure, FormControl, FormLabel, FormErrorMessage
  } from "@chakra-ui/react";

  const initialFormState = { name: '', description: '', image: ''}
  function SizeExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
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

    function validateName(value) {
      let error
      if (!value) {
        error = "Name is required"
      } else if (value.toLowerCase() !== "naruto") {
        error = "Jeez! You're not a fan 😱"
      }
      return error
    }
    
  
    return (
      <>
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          Open
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Upload a Bloom</DrawerHeader>
  
            <DrawerBody>
            <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        
        <Form overflowY = "auto">
          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name" onChange={e => setFormData({ ...formData, 'name': e.target.value})} placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="description">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input {...field} id="name" onChange={e => setFormData({ ...formData, 'description': e.target.value})} placeholder="name"/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="image">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="upload">Upload an Image</FormLabel>
                <Input {...field}  type="file" onChange={onChange}/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="blue"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Save
          </Button>
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
          
          <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue"
            isLoading={props.isSubmitting}
            type="submit" onClick={createNote}>Save</Button>
            </DrawerFooter>
        </Form>
      )}
    </Formik>
            </DrawerBody>
  
            {/* <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default SizeExample