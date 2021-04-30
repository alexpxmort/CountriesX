    /**
 *Componente de rotas
 * 
 */


 import React from   'react';
 import {Route,Switch} from 'react-router-dom';
 import HomePage from '../pages/home';
 import DetailPage from '../pages/detail'
 import EditCountryPage from '../pages/edit';
 
 const  RouterX  = ()=>(
    <Switch>
        <Route exact component={HomePage} path="/"/>
        <Route  component={DetailPage} path="/detail/:code"/>
        <Route  component={EditCountryPage} path="/edit/:code"/>
    </Switch>
 )

 export default RouterX;