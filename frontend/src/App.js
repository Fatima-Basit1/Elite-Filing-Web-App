import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import BusinessSolutions from './pages/BusinessSolutions/BusinessSolutions';
import CompanyServices from './pages/CompanyServices/CompanyServices';
import Ecommerce from './pages/Ecommerce/Ecommerce';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import USCompanyFiling from './pages/USCompanyFiling/USCompanyFiling';
import UKCompanyFiling from './pages/UKCompanyFiling/UKCompanyFiling';
import DigitalMarketing from './pages/DigitalMarketing/DigitalMarketing';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business-solutions" element={<BusinessSolutions />} />
        <Route path="/company-services" element={<CompanyServices />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs/company-filing-us" element={<USCompanyFiling />} />
        <Route path="/blogs/company-filing-uk" element={<UKCompanyFiling />} />
        <Route path="/blogs/digital-marketing" element={<DigitalMarketing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
