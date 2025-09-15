import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import BusinessSolutions from './pages/BusinessSolutions/BusinessSolutions';
import LogoCreation from './pages/LogoCreation/LogoCreation';
import RegisteredAgent from './pages/RegisteredAgent/RegisteredAgent';
import UKSharedOffices from './pages/UKSharedOffices/UKSharedOffices';
import TrademarkUK from './pages/TrademarkUK/TrademarkUK';
import CompanyServices from './pages/CompanyServices/CompanyServices';
import Ecommerce from './pages/Ecommerce/Ecommerce';
import AmazonEcommerce from './pages/Ecommerce/AmazonEcommerce';
import WalmartEcommerce from './pages/Ecommerce/WalmartEcommerce';
import EtsyEcommerce from './pages/Ecommerce/EtsyEcommerce';
import SECPRegistration from './pages/CompanyFormation/Pakistan/SECPRegistration';
import PSEBRegistration from './pages/CompanyFormation/Pakistan/PSEBRegistration';
import FBRRegistration from './pages/CompanyFormation/Pakistan/FBRRegistration';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import USCompanyFiling from './pages/USCompanyFiling/USCompanyFiling';
import UKCompanyFiling from './pages/UKCompanyFiling/UKCompanyFiling';
import DigitalMarketing from './pages/DigitalMarketing/DigitalMarketing';
import LLCFormation from './pages/USA/LLC-Formation';
import Tax from './pages/USA/Tax';
import ITIN from './pages/USA/ITIN';
import Trademark from './pages/USA/Trademark';
import CompletePackage from './pages/USA/CompletePackage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business-solutions" element={<BusinessSolutions />} />
        <Route path="/business-solutions/logo-creation" element={<LogoCreation />} />
        <Route path="/business-solutions/registered-agent" element={<RegisteredAgent />} />
        <Route path="/business-solutions/uk-shared-offices" element={<UKSharedOffices />} />
        <Route path="/business-solutions/trademark-uk" element={<TrademarkUK />} />
        <Route path="/company-services" element={<CompanyServices />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/ecommerce/amazon" element={<AmazonEcommerce />} />
        <Route path="/ecommerce/walmart" element={<WalmartEcommerce />} />
        <Route path="/ecommerce/etsy" element={<EtsyEcommerce />} />
        <Route path="/company-formation/pakistan/secp" element={<SECPRegistration />} />
        <Route path="/company-formation/pakistan/pseb" element={<PSEBRegistration />} />
        <Route path="/company-formation/pakistan/fbr" element={<FBRRegistration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs/company-filing-us" element={<USCompanyFiling />} />
        <Route path="/blogs/company-filing-uk" element={<UKCompanyFiling />} />
        <Route path="/blogs/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/USA/LLC-Formation" element={<LLCFormation />} />
        <Route path="/USA/Tax" element={<Tax />} />
        <Route path="/USA/ITIN" element={<ITIN />} />
        <Route path="/USA/Trademark" element={<Trademark />} />
        <Route path="/complete-package-for-USA" element={<CompletePackage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
