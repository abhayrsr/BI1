import './App.css';
import Books from './components/Books';
import BooksByAuthor from './components/BooksByAuthor';
import BooksByTitle from './components/BooksByTitle';

function App() {
  return (
    <main>
      <Books />
      <BooksByTitle title="The Power of Habit" />
      <BooksByAuthor authorName='F. Scott Fitzgerald' />
    </main>
  );
}

export default App;
