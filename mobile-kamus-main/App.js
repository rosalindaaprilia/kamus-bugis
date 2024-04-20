import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/data/graphql';
import Auth from './src/provider/auth';
import Guard from './src/screen/Guard';
import FontProvider from './src/provider/font';
import { StatusBar } from 'expo-status-bar';

function App() {

  return (
    <>
    <ApolloProvider client={client}>
      <FontProvider>
        <Auth>
          <Guard />
        </Auth>
      </FontProvider>
    </ApolloProvider>
    <StatusBar style="auto" />
    </>
  );
}

export default App;
