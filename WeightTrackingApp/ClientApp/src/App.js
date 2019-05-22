import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import WeightData from './components/WeighData';
import WeightEntryForm from "./components/WeightEntryForm";

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    <Route path='/weight-data' component={WeightData}/>
    <Route path='/weight-entry-form' component={WeightEntryForm} />
  </Layout>
);
