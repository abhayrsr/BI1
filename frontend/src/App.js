import './App.css';
import AddBooks from './components/AddBooks';
import Books from './components/Books';
import BooksByAuthor from './components/BooksByAuthor';
import BooksByTitle from './components/BooksByTitle';

function App() {
  return (
    <main>
      <AddBooks />
      <Books />
      <BooksByTitle title="The Power of Habit" />
      <BooksByAuthor authorName='F. Scott Fitzgerald' />
    </main>
  );
}

export default App;
