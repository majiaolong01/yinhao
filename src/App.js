import logo from './logo.svg';
import './App.scss';
import {Button} from 'antd'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <Button type="primary" block>确认</Button>
      </header>
    </div>
  );
}

export default App;
