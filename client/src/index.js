import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import Home from './components/home/home';
import AddBook from './components/addbook/addbook';
import Footer from './components/footer/footer';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, Redirect } from 'react-router-dom';
const App = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/create" exact component={AddBook} />
                <Route path="/edit/:id" exact isEdit={true} component={AddBook} />
                <Route path="/" component={Home} />
                <Redirect to="/" />
            </Switch>
            <Footer> </Footer>
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(App, document.getElementById('root'));

serviceWorker.register();




