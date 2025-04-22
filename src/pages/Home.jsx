import React from 'react'
import HeroSlider from './subComponents/HeroSlider '
import InformationSection from './subComponents/InformationSection'
import About from './About'
import LoginPage from './LoginPage'
import Dashboard from './Dashboard'
import RulesAndRegulations from './subComponents/RulesAndRegulations'
import ContactUsForm from './subComponents/ContactUsForm'

const Home = () => {
  return (
    <div>
      <HeroSlider/>
      <InformationSection/>
      <RulesAndRegulations/>
      <About/>
      <ContactUsForm/>
      <Dashboard/>
      <LoginPage/>
    </div>
  )
}

export default Home