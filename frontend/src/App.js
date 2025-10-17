import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './store/slices/authSlice';

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
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ForgotPassword';
import NotFound from './pages/NotFound/NotFound';
import USCompanyFiling from './pages/USCompanyFiling/USCompanyFiling';
import UKCompanyFiling from './pages/UKCompanyFiling/UKCompanyFiling';
import DigitalMarketing from './pages/DigitalMarketing/DigitalMarketing';
import LLCFormation from './pages/USA/LLC-Formation';
import Tax from './pages/USA/Tax';
import ITIN from './pages/USA/ITIN';
import Trademark from './pages/USA/Trademark';
import CompletePackage from './pages/USA/CompletePackage';
import CompanyRegistration from './pages/UK/CompanyRegistration';
import AnnualAccounts from './pages/UK/AnnualAccounts';
import CompanyNameChange from './pages/UK/CompanyNameChange';
import CompanyClosure from './pages/UK/CompanyClosure';
import StructuralChange from './pages/UK/StructuralChange';
import ConfirmationStatement from './pages/UK/ConfirmationStatement';
import EORIApplication from './pages/UK/EORIApplication';
import VATRegistration from './pages/UK/VATRegistration';
import VATReturn from './pages/UK/VATReturn';
import BankAccounts from './pages/UK/BankAccounts';
import SPCFreeZone from './pages/UAE/SPCFreeZone';
import CompanyFormationHome from './pages/CompanyFormation/CompanyFormationHome';
import USAFormationHome from './pages/CompanyFormation/USAFormationHome';
import UKFormationHome from './pages/CompanyFormation/UKFormationHome';
import Payment from './pages/USA/Payment';

import AllFormsSuccessModal from './components/UI/AllFormsSuccessModal';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      <AllFormsSuccessModal />
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
        {/* Company Formation Landing and Aliases */}
        <Route path="/company-formation" element={<CompanyFormationHome />} />
        <Route path="/company-formation/usa" element={<USAFormationHome />} />
        <Route path="/company-formation/uk" element={<UKFormationHome />} />
        
        {/* USA Aliases */}
        <Route path="/company-formation/usa/llc-formation" element={<LLCFormation />} />
        <Route path="/company-formation/usa/tax" element={<Tax />} />
        <Route path="/company-formation/usa/itin" element={<ITIN />} />
        <Route path="/company-formation/usa/trademark" element={<Trademark />} />
        <Route path="/company-formation/usa/complete-package" element={<CompletePackage />} />
        {/* UK Aliases */}
        <Route path="/company-formation/uk/company-registration" element={<CompanyRegistration />} />
        <Route path="/company-formation/uk/annual-accounts" element={<AnnualAccounts />} />
        <Route path="/company-formation/uk/company-closure" element={<CompanyClosure />} />
        <Route path="/company-formation/uk/name-change" element={<CompanyNameChange />} />
        <Route path="/company-formation/uk/structural-change" element={<StructuralChange />} />
        <Route path="/company-formation/uk/confirmation-statement" element={<ConfirmationStatement />} />
        <Route path="/company-formation/uk/eori-application" element={<EORIApplication />} />
        <Route path="/company-formation/uk/vat-registration" element={<VATRegistration />} />
        <Route path="/company-formation/uk/vat-return" element={<VATReturn />} />
        <Route path="/company-formation/uk/bank-accounts" element={<BankAccounts />} />
        <Route path="/company-formation/pakistan/secp" element={<SECPRegistration />} />
        <Route path="/company-formation/pakistan/pseb" element={<PSEBRegistration />} />
        <Route path="/company-formation/pakistan/fbr" element={<FBRRegistration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/get-started" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/blogs/company-filing-us" element={<USCompanyFiling />} />
        <Route path="/blogs/company-filing-uk" element={<UKCompanyFiling />} />
        <Route path="/blogs/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/USA/LLC-Formation" element={<LLCFormation />} />
        <Route path="/USA/LLC-Formation/payment" element={<Payment />} />
        <Route path="/USA/Tax" element={<Tax />} />
        <Route path="/USA/ITIN" element={<ITIN />} />
        <Route path="/USA/Trademark" element={<Trademark />} />
        <Route path="/complete-package-for-USA" element={<CompletePackage />} />
        <Route path="/UK/CompanyRegistration" element={<CompanyRegistration />} />
        <Route path="/UK/AnnualAccounts" element={<AnnualAccounts />} />
        <Route path="/UK/CompanyClosure" element={<CompanyClosure />} />
        <Route path="/UK/CompanyNameChange" element={<CompanyNameChange />} />
        <Route path="/UK/StructuralChange" element={<StructuralChange />} />
        <Route path="/UK/ConfirmationStatement" element={<ConfirmationStatement />} />
        <Route path="/UK/EORIApplication" element={<EORIApplication />} />
        <Route path="/UK/VATRegistration" element={<VATRegistration />} />
        <Route path="/UK/VATReturn" element={<VATReturn />} />
        <Route path="/UK/BankAccounts" element={<BankAccounts />} />
        <Route path="/company-formation/uae/spc-free-zone" element={<SPCFreeZone />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
