import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import WeightData from './components/WeighData';
import WeightEntryForm from "./components/WeightEntryForm";

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/weight-data' component={WeightData}/>
    <Route path='/weight-entry-form/:id?' component={WeightEntryForm} />
  </Layout>
);
