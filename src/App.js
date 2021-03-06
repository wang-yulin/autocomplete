
import './App.css';
import Autocomplete from './Autocomplete';

function App() {
  return (
    <div className="App">
      <Autocomplete
       options={[
         'Papaya',
         'Persimmon',
         'Paw Paw',
         'Prickly Pear',
         'Peach',
         'Pomegranate',
         'Pineapple'
       ]}
       />
    </div>
  );
}

export default App;
