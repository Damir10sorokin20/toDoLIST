import React, { useState } from 'react';
import {
  Container,
  TextField,
  IconButton,
  List,
  ListItem,
  Typography,
  Box,
  Checkbox,
  ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Task = {
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = () => {
    if (text.trim()) {
      setTasks([...tasks, { text, completed: false }]);
      setText('');
    }
  };

  const handleDelete = (indexToRemove: number) => {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  };

  const toggleComplete = (index: number) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Мои задачи
        </Typography>

        <Box display="flex" gap={1} mb={3}>
          <TextField
            fullWidth
            label="Новая задача"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <IconButton color="primary" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Box>

        <List>
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              sx={{
                bgcolor: '#000',
                borderRadius: 1,
                mb: 1,
                boxShadow: 1,
              }}
              secondaryAction={
                <IconButton edge="end" color="error" onClick={() => handleDelete(index)}>
                  <RemoveIcon />
                </IconButton>
              }
            >
              <Checkbox
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <ListItemText
                primary={task.text}
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'gray' : 'inherit'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default App;