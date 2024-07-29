import './App.css';
import BarChart from './Component/chart/BarChart';
import { TableSection } from './Component/Table';
import { ExtraProvider } from './context/ExtraContext';
import { TableProvider } from './context/Table';

function App() {
  return (

    <div className="App">
      <TableProvider>
        <ExtraProvider>
          <TableSection />
          <BarChart />
        </ExtraProvider>
      </TableProvider>
    </div>
  );
}

export default App;
