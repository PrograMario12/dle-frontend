import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principal from './pages/Principal'
import ConfigPage from './pages/ConfigPage';
import { AppProvider } from './components/AppContext';
import AreaList from './components/CrudAreas/AreaList';
import AddArea from './components/CrudAreas/AddArea';
import EditArea from './components/CrudAreas/EditArea';
import AreaAssetList from './components/CrudAreaAsset/AreaAssetList';
import AddAreaAsset from './components/CrudAreaAsset/AddAreaAsset';
import EditAreaAsset from './components/CrudAreaAsset/EditAreaAsset';
import ModelAssetList from './components/CrudModelAsset/ModelAssetList';
import AddModelAsset from './components/CrudModelAsset/AddModelAsset';
import EditModelAsset from './components/CrudModelAsset/EditModelAsset';
import StationList from './components/CrudStations/StationList';
import AddStation from './components/CrudStations/AddStation';
import EditStation from './components/CrudStations/EditStation';
import SideList from './components/CrudSides/SideList';
import AddSide from './components/CrudSides/AddSide';
import EditSide from './components/CrudSides/EditSide';
import SelectAreaAssets from './components/Selection/SelectAreaAssets';
import SelectModelAssets from './components/Selection/SelectModelAssets';
import RegisterStation from './components/Register/RegisterStation';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa el JS de Bootstrap

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/admin" element={<AreaList />} />
          <Route path="/admin/new-area" element={<AddArea />} />
          <Route path="/admin/edit/:id" element={<EditArea />} />
          <Route path="/admin/area-assets/:id" element={<AreaAssetList />} />
          <Route path="/admin/new-area-asset" element={<AddAreaAsset />} />
          <Route path="/admin/edit-area-asset/:id" element={<EditAreaAsset />} />
          <Route path="/admin/model-assets/:area_asset_id" element={<ModelAssetList />} />
          <Route path="/admin/new-model-asset/:area_asset_id" element={<AddModelAsset />} />
          <Route path="/admin/edit-model-asset/:id" element={<EditModelAsset />} />
          <Route path="/admin/stations/:model_asset_id" element={<StationList />} />
          <Route path="/admin/new-station/:model_asset_id" element={<AddStation />} />
          <Route path="/admin/edit-station/:id" element={<EditStation />} />
          <Route path="/admin/sides/:station_id" element={<SideList />} />
          <Route path="/admin/new-side/:station_id" element={<AddSide />} />
          <Route path="/admin/edit-side/:id" element={<EditSide />} />
          <Route path="/config/area-assets/:area_id" element={<SelectAreaAssets />} />
          <Route path="/config/model-assets/:area_asset_id" element={<SelectModelAssets />} />
          <Route path="/register-station/:cardNumber" element={<RegisterStation />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;