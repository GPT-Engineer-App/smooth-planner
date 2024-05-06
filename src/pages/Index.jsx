import { useState } from 'react';
import { Container, VStack, Input, IconButton, List, ListItem, ListIcon, Button, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <IconButton
          aria-label="Add task"
          icon={<FaCheckCircle />}
          onClick={addTask}
          colorScheme="green"
        />
        <List spacing={3} w="100%">
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
              <ListIcon as={FaCheckCircle} color={task.isCompleted ? 'green.500' : 'gray.300'} onClick={() => toggleTaskCompletion(task.id)} cursor="pointer" />
              <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.text}</span>
              <Button onClick={() => deleteTask(task.id)} size="sm" colorScheme="red">
                <FaTrash />
              </Button>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;