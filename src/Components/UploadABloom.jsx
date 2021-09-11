import React from 'react';
import { listTodos } from '../graphql/queries';
import {
  createTodo as createNoteMutation,
  deleteTodo as deleteNoteMutation,
} from './../graphql/mutations';
import { API, Storage } from 'aws-amplify';
import { Formik, Field, Form } from 'formik';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import { BloomContext } from '../Hooks/BloomContextProvider';

const initialFormState = { name: '', description: '', image: '' };

function UploadABloom() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { blooms, setBlooms } = React.useContext(BloomContext);
  const btnRef = React.useRef();
  const [notes, setNotes] = React.useState([]);
  const [formData, setFormData] = React.useState(initialFormState);
  React.useEffect(() => {
    fetchNotes();
  }, []);
  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    await Promise.all(
      notesFromAPI.map(async note => {
        if (note.image) {
          const image = await Storage.get(note.image);
          note.image = image;
        }
        return note;
      })
    );
    setBlooms(apiData.data.listTodos.items);
    // setNotes(apiData.data.listTodos.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    var response = await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });
    console.log('create note response', response);
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setBlooms([...blooms, formData]);
    // setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    // const newNotesArray = notes.filter(note => note.id !== id);
    const newNotesArray = blooms.filter(bloom => bloom.id !== id);
    setBlooms(newNotesArray);
    // setNotes(newNotesArray);
    var response = await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
    console.log('deleted id', id);
    console.log('response', response);
  }

  function validateName(value) {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  }

  return (
    <>
      <Button
        ref={btnRef}
        size={{ base: 'sm', md: 'md' }}
        bg="blue.100"
        onClick={onOpen}
        pr="5px"
        pl="5px"
        float="right"
        fontFamily="Allison"
        ml={{ base: '25%', md: '68%' }}
        fontSize={{ base: 25, md: 40 }}
      >
        Upload a Memory
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent overflowY="auto">
          <DrawerCloseButton />
          <DrawerHeader>Upload a Memory</DrawerHeader>

          <DrawerBody>
            <Formik
              initialValues={{}}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
                createNote();
              }}
            >
              {props => (
                <Form overflowY="auto">
                  <Field mb="10px" name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isRequired>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          onChange={e =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="name"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel mt="10%" htmlFor="description">
                          Description
                        </FormLabel>
                        <Textarea
                          {...field}
                          id="description"
                          onChange={e =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          placeholder="description"
                          maxLength="100"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="image">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel mt="10%" htmlFor="upload">
                          Upload an Image
                        </FormLabel>
                        <Input {...field} type="file" onChange={onChange} />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="blue"
                      isLoading={props.isSubmitting}
                      type="submit"
                      onClick={createNote}
                    >
                      Save
                    </Button>
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
  );
}

export default UploadABloom;
