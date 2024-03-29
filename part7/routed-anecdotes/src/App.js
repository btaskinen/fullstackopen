import React, { useState } from 'react';
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';
import { useField } from './hooks';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav">
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                anecdotes
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/create">
                create new
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/about" style={padding}>
                about
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar.Toggle>
    </Navbar>
  );
};

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Table striped>
        <tbody>
          {anecdotes.map((anecdote) => (
            <tr key={anecdote.id}>
              <td>
                <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is &quot;a story with a point.&quot;
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const CreateNew = ({ addNew }) => {
  const content = useField('content');
  const author = useField('author');
  const info = useField('info');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = () => {
    console.log('reset button clicked');
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control {...content} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control {...author} />
        </Form.Group>
        <Form.Group>
          <Form.Label>url for more info</Form.Label>
          <Form.Control {...info} />
        </Form.Group>
        <Button variant="primary" type="submit">
          create
        </Button>
        <Button variant="primary" type="reset">
          reset
        </Button>
      </Form>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const match = useMatch('/:id');
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null;

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote '${anecdote.content}' was created!`);
    setTimeout(() => setNotification(null), 5000);
    navigate('/');
  };

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id);

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   };

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  // };

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <Alert variant="success">{notification}</Alert>}
      <Routes>
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
      <Footer />
    </div>
  );
};

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired,
};

Anecdote.propTypes = {
  anecdote: PropTypes.object,
};

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
};

Notification.propTypes = {
  notification: PropTypes.string,
};

export default App;
