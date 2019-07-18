import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { store } from 'src/store';
import Home from 'components/home/home';
import AddBook from 'components/addbook/addbook';
import Footer from 'components/footer/footer';
import ErrorBoundary from 'components/errorboundary/errorboundary';
import './app.css';
const App = () => {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/create" exact component={AddBook} />
                        <Route path="/edit/:id" exact  component={AddBook} />
                        <Route path="/" component={Home} />
                        <Redirect to="/" />
                    </Switch>
                    <Footer> </Footer>
                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    );
};
export default App;